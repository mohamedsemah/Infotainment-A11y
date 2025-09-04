from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.auth import get_current_active_user, get_current_active_user_dev
from app.models import (
    User, 
    AnalysisSessionCreate, 
    AnalysisSessionResponse, 
    AnalysisResultResponse,
    UploadedFile
)
from app.services.analysis_service import AnalysisService

router = APIRouter(prefix="/analysis", tags=["accessibility analysis"])
analysis_service = AnalysisService()

# Add logging
import logging
logger = logging.getLogger(__name__)

@router.post("/start")
async def start_analysis_endpoint(
    request_data: dict,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_active_user_dev),
    db: Session = Depends(get_db)
):
    """Start analysis endpoint that matches frontend expectations."""
    logger.info(f"🚀 [BACKEND] Starting analysis for user {current_user.id}")
    logger.info(f"📁 [BACKEND] Files: {len(request_data.get('files', []))}")
    logger.info(f"🤖 [BACKEND] Models: {request_data.get('models', [])}")
    
    try:
        session_id = request_data.get('sessionId')
        files = request_data.get('files', [])
        models = request_data.get('models', [])
        
        logger.info(f"📝 [BACKEND] Session ID: {session_id}")
        
        # Start analysis in background
        background_tasks.add_task(
            analysis_service.start_analysis_simple,
            session_id,
            files,
            models,
            current_user.id
        )
        
        logger.info(f"✅ [BACKEND] Analysis started for session {session_id}")
        return {"message": "Analysis started", "sessionId": session_id, "status": "analyzing"}
        
    except Exception as e:
        logger.error(f"💥 [BACKEND] Failed to start analysis: {e}")
        import traceback
        logger.error(f"💥 [BACKEND] Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/progress/{session_id}")
async def get_analysis_progress(
    session_id: str,
    current_user: User = Depends(get_current_active_user_dev),
    db: Session = Depends(get_db)
):
    """Get analysis progress endpoint."""
    logger.info(f"📊 [BACKEND] Getting progress for session {session_id}")
    
    try:
        progress_data = analysis_service.get_progress(session_id)
        logger.info(f"📈 [BACKEND] Progress data: {progress_data}")
        return progress_data
        
    except Exception as e:
        logger.error(f"💥 [BACKEND] Failed to get progress: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/sessions", response_model=AnalysisSessionResponse)
async def create_analysis_session(
    session_data: AnalysisSessionCreate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new analysis session."""
    # Verify all files belong to the user
    files = db.query(UploadedFile).filter(
        UploadedFile.id.in_(session_data.file_ids),
        UploadedFile.user_id == current_user.id
    ).all()
    
    if len(files) != len(session_data.file_ids):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Some files not found or don't belong to user"
        )
    
    # Create analysis session
    db_session = AnalysisSession(
        name=session_data.name,
        description=session_data.description,
        user_id=current_user.id,
        status="pending"
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    
    # Start analysis in background
    background_tasks.add_task(
        analysis_service.start_analysis,
        db,
        db_session.id,
        session_data.file_ids,
        session_data.llm_models
    )
    
    return db_session

@router.get("/sessions", response_model=List[AnalysisSessionResponse])
async def get_user_analysis_sessions(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all analysis sessions for the current user."""
    from app.models import AnalysisSession
    sessions = db.query(AnalysisSession).filter(
        AnalysisSession.user_id == current_user.id
    ).order_by(AnalysisSession.created_at.desc()).all()
    
    return sessions

@router.get("/sessions/{session_id}", response_model=AnalysisSessionResponse)
async def get_analysis_session(
    session_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific analysis session."""
    from app.models import AnalysisSession
    session = db.query(AnalysisSession).filter(
        AnalysisSession.id == session_id,
        AnalysisSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis session not found"
        )
    
    return session

@router.get("/sessions/{session_id}/results", response_model=AnalysisResultResponse)
async def get_analysis_results(
    session_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get analysis results for a session."""
    # Verify session belongs to user
    from app.models import AnalysisSession
    session = db.query(AnalysisSession).filter(
        AnalysisSession.id == session_id,
        AnalysisSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis session not found"
        )
    
    # Get results
    results = analysis_service.get_analysis_results(db, session_id)
    return results

@router.delete("/sessions/{session_id}")
async def delete_analysis_session(
    session_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete an analysis session and its results."""
    from app.models import AnalysisSession, AnalysisResult, AnalysisFile
    
    # Verify session belongs to user
    session = db.query(AnalysisSession).filter(
        AnalysisSession.id == session_id,
        AnalysisSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis session not found"
        )
    
    # Delete related records
    db.query(AnalysisResult).filter(
        AnalysisResult.analysis_session_id == session_id
    ).delete()
    
    db.query(AnalysisFile).filter(
        AnalysisFile.analysis_session_id == session_id
    ).delete()
    
    # Delete session
    db.delete(session)
    db.commit()
    
    return {"message": "Analysis session deleted successfully"}

@router.post("/sessions/{session_id}/export")
async def export_analysis_results(
    session_id: int,
    format: str = "json",  # json, csv, pdf
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Export analysis results in various formats."""
    # Verify session belongs to user
    from app.models import AnalysisSession
    session = db.query(AnalysisSession).filter(
        AnalysisSession.id == session_id,
        AnalysisSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis session not found"
        )
    
    # Get results
    results = analysis_service.get_analysis_results(db, session_id)
    
    if format == "json":
        return results
    elif format == "csv":
        # Convert to CSV format
        import csv
        import io
        
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write header
        writer.writerow([
            "WCAG Guideline", "POUR Principle", "Severity", "Title", 
            "Description", "File Path", "Line Number", "Suggestion"
        ])
        
        # Write data
        for issue in results["issues"]:
            writer.writerow([
                issue["wcag_guideline"],
                issue["pour_principle"],
                issue["severity"],
                issue["title"],
                issue["description"],
                issue["file_path"],
                issue["line_number"],
                issue["suggestion"]
            ])
        
        return {"csv_data": output.getvalue()}
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported export format"
        )
