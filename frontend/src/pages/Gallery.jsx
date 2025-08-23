import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/Gallery.css'

function Gallery() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      setLoading(true)
      // For demo purposes, we'll create some mock stories since the API endpoint might not exist yet
      // In a real implementation, this would fetch from: /api/stories
      const mockStories = [
        {
          id: 1,
          title: "The Enchanted Forest",
          session_id: "session1",
          created_at: new Date().toISOString(),
          theme: "Fantasy",
          description: "A magical adventure through an enchanted forest filled with mystical creatures."
        },
        {
          id: 2,
          title: "Space Station Alpha",
          session_id: "session2", 
          created_at: new Date(Date.now() - 86400000).toISOString(),
          theme: "Sci-Fi",
          description: "A thrilling journey aboard a space station on the edge of the galaxy."
        },
        {
          id: 3,
          title: "The Detective's Dilemma",
          session_id: "session3",
          created_at: new Date(Date.now() - 172800000).toISOString(),
          theme: "Mystery",
          description: "Solve a complex murder case in the heart of Victorian London."
        }
      ]
      
      setTimeout(() => {
        setStories(mockStories)
        setLoading(false)
      }, 1000)
      
    } catch (err) {
      setError('Failed to load stories')
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getThemeEmoji = (theme) => {
    const themeEmojis = {
      'Fantasy': '🧙‍♂️',
      'Sci-Fi': '🚀',
      'Mystery': '🔍',
      'Horror': '👻',
      'Romance': '💕',
      'Adventure': '⚔️',
      'Western': '🤠',
      'Modern': '🏙️'
    }
    return themeEmojis[theme] || '📚'
  }

  if (loading) {
    return (
      <div className="gallery-page">
        <div className="modern-card">
          <div className="loading-container">
            <h2>Loading Stories...</h2>
            <div className="loading-animation">
              <div className="spinner"></div>
            </div>
            <p className="loading-info">Fetching the latest interactive adventures</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="gallery-page">
        <div className="modern-card">
          <div className="error-message">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={fetchStories} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery-page fade-in">
      <div className="gallery-header">
        <h1>Story Gallery</h1>
        <p>Explore amazing interactive stories created by our community</p>
      </div>

      {stories.length === 0 ? (
        <div className="modern-card">
          <div className="empty-gallery">
            <div className="empty-icon">📚</div>
            <h3>No Stories Yet</h3>
            <p>Be the first to create an interactive story!</p>
            <Link to="/" className="btn btn-primary">
              Create Your First Story
            </Link>
          </div>
        </div>
      ) : (
        <div className="stories-grid">
          {stories.map((story) => (
            <div key={story.id} className="story-card modern-card slide-in">
              <div className="story-card-header">
                <div className="story-theme">
                  <span className="theme-emoji">{getThemeEmoji(story.theme)}</span>
                  <span className="theme-text">{story.theme}</span>
                </div>
                <div className="story-date">{formatDate(story.created_at)}</div>
              </div>
              
              <div className="story-card-content">
                <h3 className="story-card-title">{story.title}</h3>
                <p className="story-card-description">{story.description}</p>
              </div>
              
              <div className="story-card-actions">
                <Link 
                  to={`/story/${story.id}`} 
                  className="btn btn-primary"
                >
                  Play Story
                </Link>
                <button className="btn btn-secondary">
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="gallery-cta">
        <div className="modern-card">
          <div className="cta-content">
            <h2>Ready to Create Your Own Adventure?</h2>
            <p>Join our community of storytellers and craft your unique interactive experience</p>
            <Link to="/" className="btn btn-success btn-lg">
              Start Creating
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery