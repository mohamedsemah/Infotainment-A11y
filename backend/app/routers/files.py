from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from typing import List
import os
import uuid
import aiofiles
from pathlib import Path
from app.database import get_db
from app.auth import get_current_active_user
from app.models import User, FileUploadResponse
from app.config import settings

router = APIRouter(prefix="/files", tags=["file management"])

# Create upload directory if it doesn't exist
os.makedirs(settings.upload_dir, exist_ok=True)

@router.post("/upload", response_model=FileUploadResponse)
async def upload_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Upload a file for analysis."""
    # Check file size
    file_size = 0
    content = await file.read()
    file_size = len(content)
    
    if file_size > settings.max_file_size_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds maximum allowed size of {settings.max_file_size}"
        )
    
    # Check file extension
    file_extension = Path(file.filename).suffix.lower()
    if file_extension not in settings.allowed_extensions_list:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type {file_extension} is not allowed"
        )
    
    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(settings.upload_dir, unique_filename)
    
    # Save file
    async with aiofiles.open(file_path, 'wb') as f:
        await f.write(content)
    
    # Get MIME type
    mime_type = file.content_type or "application/octet-stream"
    
    # Save file info to database
    from app.models import UploadedFile
    db_file = UploadedFile(
        filename=unique_filename,
        original_filename=file.filename,
        file_path=file_path,
        file_size=file_size,
        file_type=file_extension,
        mime_type=mime_type,
        user_id=current_user.id
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    
    return db_file

@router.get("/", response_model=List[FileUploadResponse])
async def get_user_files(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all files uploaded by the current user."""
    from app.models import UploadedFile
    files = db.query(UploadedFile).filter(UploadedFile.user_id == current_user.id).all()
    return files

@router.delete("/{file_id}")
async def delete_file(
    file_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a file."""
    from app.models import UploadedFile
    file = db.query(UploadedFile).filter(
        UploadedFile.id == file_id,
        UploadedFile.user_id == current_user.id
    ).first()
    
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )
    
    # Delete physical file
    if os.path.exists(file.file_path):
        os.remove(file.file_path)
    
    # Delete from database
    db.delete(file)
    db.commit()
    
    return {"message": "File deleted successfully"}

@router.get("/{file_id}/content")
async def get_file_content(
    file_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get file content for analysis."""
    from app.models import UploadedFile
    file = db.query(UploadedFile).filter(
        UploadedFile.id == file_id,
        UploadedFile.user_id == current_user.id
    ).first()
    
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )
    
    # Read file content
    try:
        async with aiofiles.open(file.file_path, 'rb') as f:
            content = await f.read()
        
        # For text files, decode as UTF-8
        if file.mime_type.startswith('text/') or file.file_type in ['.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.vue', '.svelte', '.json', '.xml', '.qml']:
            try:
                content = content.decode('utf-8')
            except UnicodeDecodeError:
                content = content.decode('utf-8', errors='ignore')
        
        return {
            "file_id": file.id,
            "filename": file.original_filename,
            "content": content,
            "mime_type": file.mime_type,
            "file_type": file.file_type
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error reading file: {str(e)}"
        )
