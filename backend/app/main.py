from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn
from app.config import settings
from app.database import create_tables
from app.routers import auth, files, analysis, wcag

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    create_tables()
    yield
    # Shutdown
    pass

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

# Include routers
app.include_router(auth.router)
app.include_router(files.router)
app.include_router(analysis.router)
app.include_router(wcag.router)

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

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "version": "1.0.0"}

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
