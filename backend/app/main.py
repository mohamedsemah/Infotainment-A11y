from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn
import logging
from app.config import settings
from app.database import create_tables
from app.routers import auth, files, analysis, wcag

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 [MAIN] Starting Accessibility Analysis API...")
    create_tables()
    logger.info("✅ [MAIN] Database tables created")
    yield
    # Shutdown
    logger.info("🛑 [MAIN] Shutting down API...")

app = FastAPI(
    title="Accessibility Analysis API",
    description="API for analyzing infotainment systems for WCAG 2.2 compliance",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with /api prefix
# Health check endpoint
@app.get("/health")
async def health_check():
    logger.info("🏥 [MAIN] Health check requested")
    return {"status": "healthy", "message": "Accessibility Analysis API is running"}

app.include_router(auth.router, prefix="/api")
app.include_router(files.router, prefix="/api")
app.include_router(analysis.router, prefix="/api")
app.include_router(wcag.router, prefix="/api")

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Accessibility Analysis API",
        "version": "1.0.0",
        "description": "API for analyzing infotainment systems for WCAG 2.2 compliance",
        "endpoints": {
            "auth": "/auth",
            "files": "/files",
            "analysis": "/analysis",
            "wcag": "/wcag",
            "docs": "/docs"
        }
    }


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "status_code": exc.status_code}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """General exception handler."""
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "status_code": 500}
    )

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
