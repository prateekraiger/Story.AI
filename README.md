# 🎭 AI Story Forge

An interactive story generator powered by Google's Gemini AI, featuring a modern dark theme and immersive user experience.

## ✨ Features

- **🤖 AI-Powered Stories**: Generate unique interactive adventures using Google Gemini AI
- **🎨 Modern Dark UI**: Beautiful, responsive design with smooth animations
- **📚 Multiple Pages**: Home, Gallery, and About pages for complete experience  
- **🔄 Interactive Choices**: Choose your own adventure with branching storylines
- **💫 Real-time Generation**: Create stories instantly with AI assistance
   - **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Fast Performance**: Optimized with daemon services for production-ready deployment



## 🛠️ Technology Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **Google Gemini AI** - Advanced language model for story generation
- **SQLAlchemy** - Database ORM with SQLite
- **Pydantic** - Data validation and settings management
- **Supervisor** - Process management for production deployment

### Frontend  
- **React 19** - Modern JavaScript framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **PM2** - Process manager for Node.js applications

## 📁 Project Structure

```
webapp/
├── backend/
│   ├── core/           # Core application logic
│   ├── models/         # Database models  
│   ├── routers/        # API endpoints
│   ├── schemas/        # Pydantic schemas
│   ├── db/            # Database configuration
│   ├── .env           # Environment variables
│   └── supervisord.conf # Process management
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Application pages
│   │   ├── styles/     # CSS modules
│   │   └── App.jsx     # Main application
│   └── ecosystem.config.cjs # PM2 configuration
└── README.md
```

## 🔧 Setup & Installation

### Prerequisites
- Python 3.9+
- Node.js 16+
- Google Gemini API Key

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   pip install supervisor
   ```

3. Configure environment:
   ```bash
   # Edit .env file and add your Gemini API key
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. Start the API server:
   ```bash
   supervisord -c supervisord.conf
   supervisorctl -c supervisord.conf status
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx pm2 start ecosystem.config.cjs
   npx pm2 status
   ```


## 🐛 Troubleshooting

### API Key Issues
If you get API key errors, ensure your `.env` file contains:
```
GOOGLE_API_KEY=your_actual_gemini_api_key
```

### Service Management
- Backend: `supervisorctl -c supervisord.conf restart story_api`
- Frontend: `npx pm2 restart story-frontend`

### Port Conflicts
Default ports are:
- Backend: 8000
- Frontend: 3000

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.



