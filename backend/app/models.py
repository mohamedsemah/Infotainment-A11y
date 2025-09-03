from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, ForeignKey, JSON, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from enum import Enum

Base = declarative_base()

# Database Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    analysis_sessions = relationship("AnalysisSession", back_populates="user")
    uploaded_files = relationship("UploadedFile", back_populates="user")

class UploadedFile(Base):
    __tablename__ = "uploaded_files"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    original_filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)
    file_type = Column(String, nullable=False)
    mime_type = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="uploaded_files")
    analysis_files = relationship("AnalysisFile", back_populates="uploaded_file")

class AnalysisSession(Base):
    __tablename__ = "analysis_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String, default="pending")  # pending, running, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="analysis_sessions")
    analysis_files = relationship("AnalysisFile", back_populates="analysis_session")
    results = relationship("AnalysisResult", back_populates="analysis_session")

class AnalysisFile(Base):
    __tablename__ = "analysis_files"
    
    id = Column(Integer, primary_key=True, index=True)
    analysis_session_id = Column(Integer, ForeignKey("analysis_sessions.id"), nullable=False)
    uploaded_file_id = Column(Integer, ForeignKey("uploaded_files.id"), nullable=False)
    processed_content = Column(Text, nullable=True)
    file_metadata = Column(JSON, nullable=True)
    
    # Relationships
    analysis_session = relationship("AnalysisSession", back_populates="analysis_files")
    uploaded_file = relationship("UploadedFile", back_populates="analysis_files")

class AnalysisResult(Base):
    __tablename__ = "analysis_results"
    
    id = Column(Integer, primary_key=True, index=True)
    analysis_session_id = Column(Integer, ForeignKey("analysis_sessions.id"), nullable=False)
    llm_model = Column(String, nullable=False)
    wcag_guideline = Column(String, nullable=False)
    pour_principle = Column(String, nullable=False)
    severity = Column(String, nullable=False)  # low, medium, high, critical
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    file_path = Column(String, nullable=True)
    line_number = Column(Integer, nullable=True)
    code_snippet = Column(Text, nullable=True)
    suggestion = Column(Text, nullable=True)
    confidence_score = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    analysis_session = relationship("AnalysisSession", back_populates="results")

# Pydantic Models
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class FileUploadResponse(BaseModel):
    id: int
    filename: str
    original_filename: str
    file_size: int
    file_type: str
    mime_type: str
    uploaded_at: datetime
    
    class Config:
        from_attributes = True

class AnalysisSessionCreate(BaseModel):
    name: str
    description: Optional[str] = None
    file_ids: List[int]
    llm_models: List[str]

class AnalysisSessionResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    status: str
    created_at: datetime
    completed_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class AccessibilityIssue(BaseModel):
    id: int
    wcag_guideline: str
    pour_principle: str
    severity: str
    title: str
    description: str
    file_path: Optional[str]
    line_number: Optional[int]
    code_snippet: Optional[str]
    suggestion: Optional[str]
    confidence_score: Optional[float]
    created_at: datetime
    
    class Config:
        from_attributes = True

class AnalysisResultResponse(BaseModel):
    session: AnalysisSessionResponse
    issues: List[AccessibilityIssue]
    summary: Dict[str, Any]

class LLMModel(BaseModel):
    id: str
    name: str
    provider: str
    description: str
    max_tokens: int
    cost_per_token: float

class POURPrinciple(str, Enum):
    PERCEIVABLE = "perceivable"
    OPERABLE = "operable"
    UNDERSTANDABLE = "understandable"
    ROBUST = "robust"

class WCAGGuideline(BaseModel):
    id: str
    title: str
    description: str
    level: str  # A, AA, AAA
    pour_principle: POURPrinciple
    success_criteria: List[str]

class FileProcessingResult(BaseModel):
    file_id: int
    content: str
    metadata: Dict[str, Any]
    processed: bool
    error: Optional[str] = None
