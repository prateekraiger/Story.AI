function LoadingStatus({theme}) {
    return (
        <div className="modern-card fade-in">
            <div className="loading-container">
                <h2>✨ Crafting Your {theme} Adventure</h2>

                <div className="loading-animation">
                    <div className="spinner"></div>
                    <div className="loading-dots">
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                    </div>
                </div>

                <p className="loading-info">
                    Our AI is weaving together an immersive story just for you...
                </p>
                
                <div style={{marginTop: '2rem', fontSize: '0.9rem', color: 'var(--secondary-text)'}}>
                    <p>🤖 Analyzing theme preferences</p>
                    <p>📚 Creating branching storylines</p>
                    <p>⚡ Adding interactive choices</p>
                </div>
            </div>
        </div>
    )
}

export default LoadingStatus;