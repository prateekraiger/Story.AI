import {useState, useEffect} from 'react';

function StoryGame({story, onNewStory}) {
    const [currentNodeId, setCurrentNodeId] = useState(null);
    const [currentNode, setCurrentNode] = useState(null)
    const [options, setOptions] = useState([])
    const [isEnding, setIsEnding] = useState(false)
    const [isWinningEnding, setIsWinningEnding] = useState(false)

    useEffect(() => {
        if (story && story.root_node) {
            const rootNodeId = story.root_node.id
            setCurrentNodeId(rootNodeId)
        }
    }, [story])

    useEffect(() => {
        if (currentNodeId && story && story.all_nodes) {
            const node = story.all_nodes[currentNodeId]

            setCurrentNode(node)
            setIsEnding(node.is_ending)
            setIsWinningEnding(node.is_winning_ending)

            if (!node.is_ending && node.options && node.options.length > 0) {
                setOptions(node.options)
            } else {
                setOptions([])
            }
        }
    }, [currentNodeId, story])

    const chooseOption = (optionId) => {
        setCurrentNodeId(optionId)
    }

    const restartStory = () => {
        if (story && story.root_node) {
            setCurrentNodeId(story.root_node.id)
        }
    }

    const shareStory = () => {
        if (navigator.share) {
            navigator.share({
                title: story.title,
                text: `Check out this interactive story: ${story.title}`,
                url: window.location.href,
            });
        } else {
            // Fallback to copying URL to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Story URL copied to clipboard!');
        }
    }

    return (
        <div className="modern-card fade-in">
            <div className="story-actions">
                <button onClick={shareStory} className="btn btn-secondary">
                    📤 Share
                </button>
                <button onClick={restartStory} className="btn btn-secondary">
                    🔄 Restart
                </button>
                {onNewStory && (
                    <button onClick={onNewStory} className="btn btn-primary">
                        ✨ New Story
                    </button>
                )}
            </div>

            <div className="story-game">
                <header className="story-header">
                    <h2 className="story-title">{story.title}</h2>
                </header>

                <div className="story-content">
                    {currentNode && (
                        <div className="story-node slide-in">
                            <p>{currentNode.content}</p>

                            {isEnding ? (
                                <div className={`story-ending ${isWinningEnding ? 'winning-ending' : 'losing-ending'}`}>
                                    <h3>
                                        {isWinningEnding ? "🎉 Victory!" : "📖 The End"}
                                    </h3>
                                    <div className="ending-message">
                                        {isWinningEnding 
                                            ? "Congratulations! You've reached a winning ending and completed your adventure successfully!" 
                                            : "Your adventure has come to an end. Every choice shapes the story - perhaps a different path awaits?"
                                        }
                                    </div>
                                    <div className="story-controls">
                                        <button onClick={restartStory} className="btn btn-primary">
                                            🔄 Try Again
                                        </button>
                                        {onNewStory && (
                                            <button onClick={onNewStory} className="btn btn-success">
                                                ✨ New Adventure
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="story-options">
                                    <h3>🤔 What will you do?</h3>
                                    <div className="options-list">
                                        {options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => chooseOption(option.node_id)}
                                                className="option-btn"
                                            >
                                                <span className="option-number">{index + 1}.</span>
                                                <span className="option-text">{option.text}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StoryGame