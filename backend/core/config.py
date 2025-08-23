from typing import List
from pydantic_settings import BaseSettings
from pydantic import field_validator
import os

class Settings(BaseSettings):
    API_PREFIX: str = "/api"
    DEBUG: bool = False

    DATABASE_URL: str = "sqlite:///./story_generator.db"

    ALLOWED_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000,http://0.0.0.0:3000"

    GOOGLE_API_KEY: str = None

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    @field_validator("ALLOWED_ORIGINS")
    def parse_allowed_origins(cls, v: str) -> List[str]:
        return v.split(",") if v else []

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()
