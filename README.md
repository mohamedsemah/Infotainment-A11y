# Infotainment A11y Analyzer

A comprehensive full-stack application for analyzing and fixing accessibility issues in infotainment systems based on WCAG 2.2 guidelines.

## 🚀 Features

### Core Functionality
- **File Upload**: Support for 80+ file types including web technologies, audio/video, images, programming languages, and automotive-specific formats
- **AI-Powered Analysis**: Integration with 6 cutting-edge LLM models (GPT-5, Claude Opus 4, Gemini 2.5 Pro, Grok 4, Llama 4, DeepSeek V3.1)
- **WCAG 2.2 Compliance**: Comprehensive analysis based on the latest Web Content Accessibility Guidelines
- **POUR Classification**: Issues categorized by Perceivable, Operable, Understandable, and Robust principles

### User Experience
- **Premium UI/UX**: Modern, responsive design with smooth animations
- **Dark/Light Mode**: Stylish theme toggle with persistent preferences
- **Interactive Results**: Detailed issue analysis with code snippets and live preview
- **Session Management**: Save and export analysis results
- **User Authentication**: Secure login/register system

### Technical Features
- **Modular Architecture**: Expandable codebase for future enhancements
- **TypeScript**: Full type safety and better development experience
- **State Management**: Zustand for efficient state handling
- **Responsive Design**: Works seamlessly across all device sizes

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI) v5** for premium UI components
- **Zustand** for state management
- **React Router v6** for navigation
- **Framer Motion** for smooth animations
- **React Dropzone** for file handling
- **React Syntax Highlighter** for code display
- **React Hot Toast** for notifications

### Backend
- **FastAPI** with Python for high-performance API
- **SQLAlchemy** for database ORM
- **JWT** for authentication
- **Pydantic** for data validation
- **SQLite/PostgreSQL** for data storage
- **LLM Integration** with 6 major AI providers

## 📁 Project Structure

```
├── frontend/              # React TypeScript frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   │   ├── Auth/     # Authentication components
│   │   │   ├── FileUpload/ # File upload functionality
│   │   │   ├── LLMSelection/ # AI model selection
│   │   │   ├── Layout/   # Main layout components
│   │   │   └── Results/  # Results display components
│   │   ├── pages/        # Main application pages
│   │   ├── data/         # Static data and configurations
│   │   ├── store/        # State management
│   │   ├── theme/        # Theme configuration
│   │   └── types/        # TypeScript definitions
│   ├── package.json      # Frontend dependencies
│   └── README.md         # Frontend documentation
├── backend/              # Python FastAPI backend
│   ├── app/
│   │   ├── routers/      # API endpoints
│   │   ├── services/     # Business logic
│   │   ├── data/         # WCAG and LLM data
│   │   └── models.py     # Database models
│   ├── requirements.txt  # Backend dependencies
│   └── README.md         # Backend documentation
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+ and pip
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd infotainment-a11y-analyzer
   ```

2. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   cp env.example .env
   # Edit .env with your LLM API keys
   python run.py
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Quick Start Scripts

For easier development, you can use the provided scripts:

**Windows:**
```bash
./start-dev.bat
```

**Linux/Mac:**
```bash
./start-dev.sh
```

These scripts will start both the backend and frontend servers automatically.

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
# Backend is ready for production with uvicorn
```

## 📋 Supported File Types

### Web Technologies
- HTML/XML: `.html`, `.htm`, `.xml`, `.qml`
- Stylesheets: `.css`
- JavaScript/TypeScript: `.js`, `.ts`, `.jsx`, `.tsx`
- Frameworks: `.vue`, `.svelte`

### Media Files
- Audio: `.mp3`, `.aac`, `.wav`, `.flac`, `.ogg`, `.m4a`
- Video: `.mp4`, `.avi`, `.mkv`, `.mov`, `.m4v`, `.3gp`
- Images: `.jpg`, `.jpeg`, `.png`, `.bmp`, `.gif`, `.webp`, `.svg`, `.ico`, `.icns`

### Programming Languages
- C/C++: `.c`, `.cpp`, `.h`, `.hpp`
- Java: `.java`
- Kotlin: `.kt`
- Python: `.py`
- C#: `.cs`

### Automotive/Infotainment Specific
- Network: `.bt`, `.can`, `.dbc`, `.pcap`, `.pcapng`
- Logs: `.log`, `.txt`
- Database: `.db`, `.sqlite`, `.mdb`
- Configuration: `.json`, `.ini`, `.cfg`, `.conf`, `.yaml`, `.yml`

### And many more...

## 🤖 Supported AI Models

1. **GPT-5** (OpenAI) - Latest GPT model with enhanced reasoning
2. **Claude Opus 4** (Anthropic) - Most capable Claude model
3. **Gemini 2.5 Pro** (Google) - Superior multimodal understanding
4. **Grok 4** (xAI) - Real-time information access
5. **Llama 4** (Meta) - Open-source with excellent code analysis
6. **DeepSeek V3.1** (DeepSeek) - Advanced reasoning for technical analysis

## 🎨 WCAG 2.2 Compliance

The application analyzes your infotainment system against all four POUR principles:

### Perceivable
- Text alternatives for non-text content
- Time-based media alternatives
- Adaptable content structure
- Distinguishable content (contrast, color, etc.)

### Operable
- Keyboard accessibility
- Sufficient time for users
- Seizure prevention
- Navigable interface
- Input modalities

### Understandable
- Readable content
- Predictable interface
- Input assistance

### Robust
- Compatible with assistive technologies
- Valid markup and code

## 🔧 Configuration

### Environment Variables

**Backend (.env in backend/ directory):**
```env
# Database
DATABASE_URL=sqlite:///./accessibility_analysis.db

# JWT
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# LLM API Keys
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
GOOGLE_API_KEY=your-google-api-key
GROQ_API_KEY=your-groq-api-key
HUGGINGFACE_API_KEY=your-huggingface-api-key
DEEPSEEK_API_KEY=your-deepseek-api-key

# CORS
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

**Frontend (.env in frontend/ directory):**
```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

### Customization

**Frontend:**
- **Theme**: Modify `frontend/src/theme/index.ts` for custom colors and styling
- **WCAG Guidelines**: Update `frontend/src/data/wcag22.ts` for additional guidelines
- **AI Models**: Configure models in `frontend/src/data/llmModels.ts`

**Backend:**
- **WCAG Guidelines**: Update `backend/app/data/wcag22.py` for additional guidelines
- **AI Models**: Configure models in `backend/app/data/llm_models.py`
- **File Types**: Add new file types in `backend/app/config.py`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure environment variables

### Docker

**Frontend:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Backend:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Contact the development team

## 🔮 Roadmap

- [ ] Real-time collaboration features
- [ ] Advanced remediation engine
- [ ] Integration with popular IDEs
- [ ] Automated testing integration
- [ ] Performance optimization tools
- [ ] Multi-language support
- [ ] API for third-party integrations

---

Built with ❤️ for accessible infotainment systems
