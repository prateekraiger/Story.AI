import {useState} from "react"

function ThemeInput({onSubmit}) {
    const [theme, setTheme] = useState("");
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!theme.trim()) {
            setError("Please enter a theme name");
            return
        }

        setError("")
        onSubmit(theme);
    }

    const handleExampleClick = (exampleTheme) => {
        setTheme(exampleTheme)
        setError("")
    }

    const examples = [
        "Fantasy Adventure", "Space Exploration", "Medieval Quest", "Pirate's Journey",
        "Mystery Detective", "Horror Mansion", "Cyberpunk Future", "Wild West",
        "Underwater City", "Time Travel", "Zombie Apocalypse", "Magical School"
    ]

    return (
        <div className="modern-card fade-in">
            <div className="theme-input-container">
                <h2>Generate Your Adventure</h2>
                <p>Enter a theme for your interactive story and let AI create an immersive experience</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="theme-input">Story Theme</label>
                        <input
                            id="theme-input"
                            type="text"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            placeholder="Enter your story theme (e.g., pirates, space, medieval...)"
                            className={`input-field ${error ? 'error' : ''}`}
                        />
                        {error && <p className="error-text">{error}</p>}
                    </div>
                    <button type="submit" className='btn btn-primary btn-lg'>
                        ✨ Generate Story
                    </button>
                </form>

                <div className="examples">
                    <h3>Popular Themes</h3>
                    <div className="examples-grid">
                        {examples.map((example, index) => (
                            <div
                                key={index}
                                className="example-tag"
                                onClick={() => handleExampleClick(example)}
                            >
                                {example}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemeInput;