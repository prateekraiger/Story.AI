import '../styles/About.css'

function About() {
  return (
    <div className="about-page fade-in">
      <div className="modern-card">
        <div className="about-content">
          <h1>About AI Story Forge</h1>
          <p className="intro-text">
            Welcome to AI Story Forge, where artificial intelligence meets creative storytelling. 
            Our platform uses advanced AI to generate immersive, interactive choose-your-own-adventure 
            stories tailored to your preferences.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered</h3>
              <p>Powered by Google's Gemini AI for creative and engaging story generation</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Interactive Stories</h3>
              <p>Choose your own adventure with branching narratives and multiple endings</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Customizable Themes</h3>
              <p>Create stories in any genre - fantasy, sci-fi, mystery, romance, and more</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Generation</h3>
              <p>Generate complete interactive stories in seconds with AI assistance</p>
            </div>
          </div>
          
          <div className="how-it-works">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Choose Your Theme</h4>
                  <p>Enter a theme or setting for your story - be creative!</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>AI Generation</h4>
                  <p>Our AI creates a branching story with multiple paths and endings</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Play & Explore</h4>
                  <p>Make choices and discover different outcomes in your story</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="tech-stack">
            <h2>Technology Stack</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <span className="tech-name">React</span>
                <span className="tech-desc">Modern frontend framework</span>
              </div>
              <div className="tech-item">
                <span className="tech-name">FastAPI</span>
                <span className="tech-desc">High-performance Python backend</span>
              </div>
              <div className="tech-item">
                <span className="tech-name">Google Gemini</span>
                <span className="tech-desc">Advanced AI language model</span>
              </div>
              <div className="tech-item">
                <span className="tech-name">SQLite</span>
                <span className="tech-desc">Lightweight database</span>
              </div>
            </div>
          </div>
          
          <div className="cta-section">
            <h2>Ready to Create Your Story?</h2>
            <p>Start your adventure now and discover endless possibilities!</p>
            <a href="/" className="btn btn-primary btn-lg">
              Create Your Story
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About