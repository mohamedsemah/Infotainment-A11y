# Accessibility Analysis Backend

A FastAPI-based backend service for analyzing infotainment systems for WCAG 2.2 compliance using multiple LLM models.

## Features

- **User Authentication**: JWT-based authentication system
- **File Upload**: Support for 100+ file types including code, media, and configuration files
- **LLM Integration**: Support for 6 major LLM providers (GPT-5, Claude Opus 4, Gemini 2.5 Pro, Grok 4, Llama 4, DeepSeek V3.1)
- **WCAG 2.2 Analysis**: Comprehensive accessibility analysis based on WCAG 2.2 guidelines
- **POUR Classification**: Issues categorized by Perceivable, Operable, Understandable, and Robust principles
- **Real-time Analysis**: Background processing with status tracking
- **Export Functionality**: Export results in JSON and CSV formats
- **Session Management**: Save and manage analysis sessions

## Quick Start

### Prerequisites

- Python 3.8+
- pip or poetry

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

5. **Run the application**
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at `http://localhost:8000`

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

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

# File Upload
MAX_FILE_SIZE=100MB
UPLOAD_DIR=./uploads
ALLOWED_EXTENSIONS=.html,.htm,.xml,.qml,.css,.js,.ts,.jsx,.tsx,.vue,.svelte,.mp3,.aac,.wav,.flac,.ogg,.m4a,.mp4,.avi,.mkv,.mov,.m4v,.3gp,.jpg,.jpeg,.png,.bmp,.gif,.webp,.svg,.ico,.icns,.c,.cpp,.h,.hpp,.java,.kt,.py,.cs,.so,.dll,.elf,.bin,.hex,.dex,.pyo,.pyc,.sh,.bat,.ps1,.db,.sqlite,.mdb,.nfs,.img,.geojson,.kml,.kmz,.gpx,.ndb,.mdx,.json,.ini,.cfg,.conf,.yaml,.yml,.properties,.plist,.bt,.can,.dbc,.log,.txt,.pcap,.pcapng,.apk,.ipa,.deb,.rpm,.zip,.tar,.tar.gz,.iso,.7z,.ttf,.otf,.ttc,.res,.arsc,.pem,.crt,.key,.der,.pfx,.p12

# CORS
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Analysis
MAX_CONCURRENT_ANALYSES=5
ANALYSIS_TIMEOUT=300
```

### API Keys Setup

You'll need API keys for the LLM providers you want to use:

1. **OpenAI (GPT-5)**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Anthropic (Claude)**: Get your API key from [Anthropic Console](https://console.anthropic.com/)
3. **Google (Gemini)**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. **xAI (Grok)**: Get your API key from [xAI Platform](https://console.x.ai/)
5. **Groq (Llama)**: Get your API key from [Groq Console](https://console.groq.com/)
6. **DeepSeek**: Get your API key from [DeepSeek Platform](https://platform.deepseek.com/)

## API Documentation

Once the server is running, you can access:

- **Interactive API Docs**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`
- **OpenAPI Schema**: `http://localhost:8000/openapi.json`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token
- `GET /auth/me` - Get current user info
- `POST /auth/refresh` - Refresh access token

### File Management
- `POST /files/upload` - Upload a file
- `GET /files/` - Get user's uploaded files
- `GET /files/{file_id}/content` - Get file content
- `DELETE /files/{file_id}` - Delete a file

### Analysis
- `POST /analysis/sessions` - Create analysis session
- `GET /analysis/sessions` - Get user's analysis sessions
- `GET /analysis/sessions/{session_id}` - Get specific session
- `GET /analysis/sessions/{session_id}/results` - Get analysis results
- `POST /analysis/sessions/{session_id}/export` - Export results
- `DELETE /analysis/sessions/{session_id}` - Delete session

### WCAG & Models
- `GET /wcag/guidelines` - Get WCAG 2.2 guidelines
- `GET /wcag/principles` - Get POUR principles
- `GET /wcag/models` - Get available LLM models

## Usage Example

### 1. Register and Login
```bash
# Register
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "username": "testuser", "password": "password123"}'

# Login
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### 2. Upload Files
```bash
curl -X POST "http://localhost:8000/files/upload" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@example.html"
```

### 3. Start Analysis
```bash
curl -X POST "http://localhost:8000/analysis/sessions" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Analysis",
    "description": "Testing accessibility",
    "file_ids": [1, 2, 3],
    "llm_models": ["gpt-5", "claude-opus-4"]
  }'
```

### 4. Get Results
```bash
curl -X GET "http://localhost:8000/analysis/sessions/1/results" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Database

The application uses SQLAlchemy with SQLite by default. You can switch to PostgreSQL by updating the `DATABASE_URL` in your `.env` file.

### Database Models

- **User**: User accounts and authentication
- **UploadedFile**: File metadata and storage info
- **AnalysisSession**: Analysis sessions and status
- **AnalysisFile**: Files associated with analysis sessions
- **AnalysisResult**: Individual accessibility issues found

## File Processing

The system supports 100+ file types including:

- **Web Technologies**: HTML, CSS, JavaScript, TypeScript, React, Vue, etc.
- **Programming Languages**: C, C++, Java, Python, C#, etc.
- **Media Files**: Images, audio, video files
- **Configuration**: JSON, YAML, XML, INI files
- **Archives**: ZIP, TAR, 7Z files
- **And many more...**

## LLM Integration

The system integrates with 6 major LLM providers:

1. **GPT-5** (OpenAI) - Advanced reasoning and analysis
2. **Claude Opus 4** (Anthropic) - Complex reasoning capabilities
3. **Gemini 2.5 Pro** (Google) - Multimodal analysis
4. **Grok 4** (xAI) - Real-time information access
5. **Llama 4** (Meta) - Open-source performance
6. **DeepSeek V3.1** (DeepSeek) - Strong coding analysis

## WCAG 2.2 Compliance

The system analyzes code against WCAG 2.2 guidelines, categorizing issues by:

- **Perceivable**: Information must be presentable to users
- **Operable**: Interface components must be operable
- **Understandable**: Information and UI operation must be understandable
- **Robust**: Content must be robust enough for various user agents

## Development

### Project Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection
│   ├── models.py            # SQLAlchemy and Pydantic models
│   ├── auth.py              # Authentication utilities
│   ├── routers/             # API route handlers
│   │   ├── auth.py
│   │   ├── files.py
│   │   ├── analysis.py
│   │   └── wcag.py
│   ├── services/            # Business logic
│   │   ├── llm_service.py
│   │   └── analysis_service.py
│   └── data/                # Static data
│       ├── wcag22.py
│       └── llm_models.py
├── requirements.txt
├── env.example
└── README.md
```

### Running Tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Code Quality
```bash
# Install development dependencies
pip install black isort flake8 mypy

# Format code
black app/
isort app/

# Lint code
flake8 app/
mypy app/
```

## Deployment

### Docker Deployment
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Production Considerations

1. **Database**: Use PostgreSQL for production
2. **File Storage**: Use cloud storage (AWS S3, Google Cloud Storage)
3. **Security**: Use strong JWT secrets and HTTPS
4. **Monitoring**: Add logging and monitoring
5. **Scaling**: Use load balancers and multiple instances

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
