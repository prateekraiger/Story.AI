from sqlalchemy.orm import Session
import json
import re
from typing import Dict, Any

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from core.prompts import STORY_PROMPT
from models.story import Story, StoryNode
from core.models import StoryLLMResponse, StoryNodeLLM
from core.config import settings
from dotenv import load_dotenv
import os

load_dotenv()

class StoryGenerator:

    @classmethod
    def _get_llm(cls):
        google_api_key = settings.GOOGLE_API_KEY or os.getenv("GOOGLE_API_KEY")
        if not google_api_key:
            raise ValueError("GOOGLE_API_KEY environment variable not set. Please set your Gemini API key in the .env file.")
        return ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=google_api_key)

    @classmethod
    def _clean_json_response(cls, response_text: str) -> str:
        """Clean and extract JSON from LLM response"""
        # Remove markdown code blocks if present
        response_text = re.sub(r'^```json\s*', '', response_text, flags=re.MULTILINE)
        response_text = re.sub(r'^```\s*$', '', response_text, flags=re.MULTILINE)
        
        # Find JSON content between braces
        start_idx = response_text.find('{')
        end_idx = response_text.rfind('}')
        
        if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
            return response_text[start_idx:end_idx + 1]
        
        return response_text.strip()

    @classmethod
    def generate_story(cls, db: Session, session_id: str, theme: str = "fantasy")-> Story:
        llm = cls._get_llm()
        story_parser = PydanticOutputParser(pydantic_object=StoryLLMResponse)

        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                STORY_PROMPT
            ),
            (
                "human",
                f"Create the story with this theme: {theme}"
            )
        ]).partial(format_instructions=story_parser.get_format_instructions())

        try:
            raw_response = llm.invoke(prompt.invoke({}))

            response_text = raw_response
            if hasattr(raw_response, "content"):
                response_text = raw_response.content

            # Clean the response text
            cleaned_response = cls._clean_json_response(response_text)
            
            # Try to parse with Pydantic first
            try:
                story_structure = story_parser.parse(cleaned_response)
            except Exception as e:
                print(f"Pydantic parsing failed: {e}")
                # Fallback to manual JSON parsing
                story_data = json.loads(cleaned_response)
                story_structure = StoryLLMResponse.model_validate(story_data)
        except Exception as e:
            print(f"Story generation failed: {e}")
            # Create a fallback simple story
            fallback_story = {
                "title": f"Adventure in {theme.title()}",
                "rootNode": {
                    "content": f"You find yourself in a mysterious {theme} world. What do you do?",
                    "isEnding": False,
                    "isWinningEnding": False,
                    "options": [
                        {
                            "text": "Explore the area carefully",
                            "nextNode": {
                                "content": "You discover a hidden treasure! You win!",
                                "isEnding": True,
                                "isWinningEnding": True,
                                "options": []
                            }
                        },
                        {
                            "text": "Rush forward boldly",
                            "nextNode": {
                                "content": "You fall into a trap! Game over.",
                                "isEnding": True,
                                "isWinningEnding": False,
                                "options": []
                            }
                        }
                    ]
                }
            }
            story_structure = StoryLLMResponse.model_validate(fallback_story)

        story_db = Story(title=story_structure.title, session_id=session_id)
        db.add(story_db)
        db.flush()

        root_node_data = story_structure.rootNode
        if isinstance(root_node_data, dict):
            root_node_data = StoryNodeLLM.model_validate(root_node_data)

        cls._process_story_node(db, story_db.id, root_node_data, is_root=True)

        db.commit()
        return story_db

    @classmethod
    def _process_story_node(cls, db: Session, story_id: int, node_data: StoryNodeLLM, is_root: bool = False) -> StoryNode:
        node = StoryNode(
            story_id=story_id,
            content=node_data.content if hasattr(node_data, "content") else node_data["content"],
            is_root=is_root,
            is_ending=node_data.isEnding if hasattr(node_data, "isEnding") else node_data["isEnding"],
            is_winning_ending=node_data.isWinningEnding if hasattr(node_data, "isWinningEnding") else node_data["isWinningEnding"],
            options=[]
        )
        db.add(node)
        db.flush()

        if not node.is_ending and (hasattr(node_data, "options") and node_data.options):
            options_list = []
            for option_data in node_data.options:
                next_node = option_data.nextNode

                if isinstance(next_node, dict):
                    next_node = StoryNodeLLM.model_validate(next_node)

                child_node = cls._process_story_node(db, story_id, next_node, False)

                options_list.append({
                    "text": option_data.text,
                    "node_id": child_node.id
                })

            node.options = options_list

        db.flush()
        return node
