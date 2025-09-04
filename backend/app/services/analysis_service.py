import asyncio
import logging
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models import (
    AnalysisSession, 
    AnalysisFile, 
    AnalysisResult, 
    UploadedFile,
    FileProcessingResult
)
from app.services.llm_service import LLMService
from app.data.wcag22 import WCAG_22_GUIDELINES, POUR_PRINCIPLES

logger = logging.getLogger(__name__)

# In-memory storage for analysis progress (in production, use Redis or database)
analysis_progress = {}

class AnalysisService:
    def __init__(self):
        self.llm_service = LLMService()
    
    async def start_analysis(
        self,
        db: Session,
        session_id: int,
        file_ids: List[int],
        llm_models: List[str]
    ) -> Dict[str, Any]:
        """Start accessibility analysis for uploaded files."""
        # Get analysis session
        session = db.query(AnalysisSession).filter(AnalysisSession.id == session_id).first()
        if not session:
            raise ValueError("Analysis session not found")
        
        # Update session status
        session.status = "running"
        db.commit()
        
        try:
            # Get uploaded files
            files = db.query(UploadedFile).filter(UploadedFile.id.in_(file_ids)).all()
            
            # Process files
            processed_files = await self._process_files(files)
            
            # Create analysis file records
            for file_data in processed_files:
                analysis_file = AnalysisFile(
                    analysis_session_id=session_id,
                    uploaded_file_id=file_data["file_id"],
                    processed_content=file_data["content"],
                    file_metadata=file_data["metadata"]
                )
                db.add(analysis_file)
            db.commit()
            
            # Analyze with each LLM
            all_issues = []
            for llm_model in llm_models:
                issues = await self._analyze_with_llm(
                    db, session_id, processed_files, llm_model
                )
                all_issues.extend(issues)
            
            # Update session status
            session.status = "completed"
            db.commit()
            
            return {
                "session_id": session_id,
                "total_issues": len(all_issues),
                "issues_by_pour": self._categorize_by_pour(all_issues),
                "issues_by_severity": self._categorize_by_severity(all_issues)
            }
            
        except Exception as e:
            # Update session status to failed
            session.status = "failed"
            db.commit()
            raise e
    
    async def _process_files(self, files: List[UploadedFile]) -> List[Dict[str, Any]]:
        """Process uploaded files for analysis."""
        processed_files = []
        
        for file in files:
            try:
                # Read file content
                with open(file.file_path, 'rb') as f:
                    content = f.read()
                
                # Decode text files
                if file.mime_type.startswith('text/') or file.file_type in [
                    '.html', '.css', '.js', '.ts', '.jsx', '.tsx', 
                    '.vue', '.svelte', '.json', '.xml', '.qml'
                ]:
                    try:
                        content = content.decode('utf-8')
                    except UnicodeDecodeError:
                        content = content.decode('utf-8', errors='ignore')
                else:
                    # For binary files, we'll analyze metadata and structure
                    content = f"Binary file: {file.original_filename}\nSize: {file.file_size} bytes\nType: {file.mime_type}"
                
                # Extract metadata
                metadata = {
                    "filename": file.original_filename,
                    "file_type": file.file_type,
                    "mime_type": file.mime_type,
                    "file_size": file.file_size,
                    "is_text": file.mime_type.startswith('text/') or file.file_type in [
                        '.html', '.css', '.js', '.ts', '.jsx', '.tsx', 
                        '.vue', '.svelte', '.json', '.xml', '.qml'
                    ]
                }
                
                processed_files.append({
                    "file_id": file.id,
                    "content": content,
                    "metadata": metadata
                })
                
            except Exception as e:
                print(f"Error processing file {file.original_filename}: {e}")
                processed_files.append({
                    "file_id": file.id,
                    "content": f"Error processing file: {str(e)}",
                    "metadata": {"error": str(e)}
                })
        
        return processed_files
    
    async def _analyze_with_llm(
        self,
        db: Session,
        session_id: int,
        processed_files: List[Dict[str, Any]],
        llm_model: str
    ) -> List[Dict[str, Any]]:
        """Analyze files with a specific LLM model."""
        all_issues = []
        
        for file_data in processed_files:
            try:
                # Analyze file content
                response = await self.llm_service.analyze_accessibility(
                    llm_model,
                    file_data["content"],
                    file_data["metadata"]["file_type"],
                    file_data["metadata"]["filename"]
                )
                
                # Parse response
                issues = self.llm_service.parse_llm_response(response, llm_model)
                
                # Save issues to database
                for issue in issues:
                    db_issue = AnalysisResult(
                        analysis_session_id=session_id,
                        llm_model=llm_model,
                        wcag_guideline=issue.get("wcag_guideline", "Unknown"),
                        pour_principle=issue.get("pour_principle", "unknown"),
                        severity=issue.get("severity", "medium"),
                        title=issue.get("title", "Accessibility Issue"),
                        description=issue.get("description", ""),
                        file_path=file_data["metadata"]["filename"],
                        line_number=issue.get("line_number"),
                        code_snippet=issue.get("code_snippet"),
                        suggestion=issue.get("suggestion"),
                        confidence_score=issue.get("confidence_score", 0.5)
                    )
                    db.add(db_issue)
                    all_issues.append(issue)
                
                db.commit()
                
            except Exception as e:
                print(f"Error analyzing file with {llm_model}: {e}")
                continue
        
        return all_issues
    
    def _categorize_by_pour(self, issues: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
        """Categorize issues by POUR principle."""
        categorized = {
            "perceivable": [],
            "operable": [],
            "understandable": [],
            "robust": []
        }
        
        for issue in issues:
            pour_principle = issue.get("pour_principle", "unknown").lower()
            if pour_principle in categorized:
                categorized[pour_principle].append(issue)
        
        return categorized
    
    def _categorize_by_severity(self, issues: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
        """Categorize issues by severity level."""
        categorized = {
            "critical": [],
            "high": [],
            "medium": [],
            "low": []
        }
        
        for issue in issues:
            severity = issue.get("severity", "medium").lower()
            if severity in categorized:
                categorized[severity].append(issue)
        
        return categorized
    
    def get_analysis_results(
        self,
        db: Session,
        session_id: int
    ) -> Dict[str, Any]:
        """Get analysis results for a session."""
        # Get session
        session = db.query(AnalysisSession).filter(AnalysisSession.id == session_id).first()
        if not session:
            raise ValueError("Analysis session not found")
        
        # Get all issues for this session
        issues = db.query(AnalysisResult).filter(
            AnalysisResult.analysis_session_id == session_id
        ).all()
        
        # Convert to dict format
        issues_data = []
        for issue in issues:
            issues_data.append({
                "id": issue.id,
                "wcag_guideline": issue.wcag_guideline,
                "pour_principle": issue.pour_principle,
                "severity": issue.severity,
                "title": issue.title,
                "description": issue.description,
                "file_path": issue.file_path,
                "line_number": issue.line_number,
                "code_snippet": issue.code_snippet,
                "suggestion": issue.suggestion,
                "confidence_score": issue.confidence_score,
                "created_at": issue.created_at
            })
        
        # Categorize issues
        issues_by_pour = self._categorize_by_pour(issues_data)
        issues_by_severity = self._categorize_by_severity(issues_data)
        
        # Create summary
        summary = {
            "total_issues": len(issues_data),
            "issues_by_pour": {k: len(v) for k, v in issues_by_pour.items()},
            "issues_by_severity": {k: len(v) for k, v in issues_by_severity.items()},
            "unique_wcag_guidelines": len(set(issue["wcag_guideline"] for issue in issues_data)),
            "files_analyzed": len(set(issue["file_path"] for issue in issues_data if issue["file_path"]))
        }
        
        return {
            "session": {
                "id": session.id,
                "name": session.name,
                "description": session.description,
                "status": session.status,
                "created_at": session.created_at,
                "completed_at": session.completed_at
            },
            "issues": issues_data,
            "issues_by_pour": issues_by_pour,
            "issues_by_severity": issues_by_severity,
            "summary": summary
        }
    
    async def start_analysis_simple(
        self,
        session_id: str,
        files: List[Dict],
        models: List[str],
        user_id: str
    ):
        """Simplified analysis start method for frontend compatibility."""
        logger.info(f"🚀 [ANALYSIS SERVICE] Starting real LLM analysis for session {session_id}")
        logger.info(f"📁 [ANALYSIS SERVICE] Files: {len(files)}")
        logger.info(f"🤖 [ANALYSIS SERVICE] Models: {models}")
        
        # Initialize progress
        analysis_progress[session_id] = {
            "status": "analyzing",
            "progress": 0,
            "issues": [],
            "error": None
        }
        
        try:
            # Calculate total steps
            total_steps = len(files) * len(models) + 2  # +2 for setup and completion
            current_step = 0
            
            # Step 1: Setup
            logger.info(f"📝 [ANALYSIS SERVICE] Step 1: Setup")
            analysis_progress[session_id]["progress"] = int((current_step / total_steps) * 100)
            current_step += 1
            await asyncio.sleep(0.5)
            
            # Step 2: Analyze each file with each model
            for file_idx, file_data in enumerate(files):
                file_name = file_data.get('name', 'Unknown')
                file_content = file_data.get('content', '')
                file_type = file_data.get('type', 'text/plain')
                
                logger.info(f"📄 [ANALYSIS SERVICE] Processing file {file_idx + 1}/{len(files)}: {file_name}")
                
                for model_idx, model_id in enumerate(models):
                    logger.info(f"🤖 [ANALYSIS SERVICE] Using model {model_idx + 1}/{len(models)}: {model_id}")
                    
                    try:
                        # Call real LLM service for analysis
                        logger.info(f"🔍 [ANALYSIS SERVICE] Calling LLM {model_id} for analysis...")
                        response = await self.llm_service.analyze_accessibility(
                            model_id,
                            file_content,
                            file_type,
                            file_name
                        )
                        
                        logger.info(f"📝 [ANALYSIS SERVICE] LLM {model_id} response received")
                        
                        # Parse LLM response to extract issues
                        issues = self.llm_service.parse_llm_response(response, model_id)
                        
                        logger.info(f"🎯 [ANALYSIS SERVICE] Found {len(issues)} issues from {model_id}")
                        
                        # Convert issues to frontend format
                        for issue_idx, issue in enumerate(issues):
                            formatted_issue = {
                                "id": f"issue_{session_id}_{file_idx}_{model_idx}_{issue_idx}",
                                "title": issue.get("title", f"Accessibility Issue in {file_name}"),
                                "description": issue.get("description", "Accessibility issue found by LLM analysis"),
                                "severity": issue.get("severity", "medium"),
                                "wcagGuideline": {
                                    "id": f"wcag_{issue_idx}",
                                    "principle": issue.get("pour_principle", "Perceivable"),
                                    "guideline": issue.get("wcag_guideline", "1.1.1 Non-text Content"),
                                    "level": issue.get("wcag_level", "A"),
                                    "successCriteria": issue.get("success_criteria", "1.1.1"),
                                    "description": issue.get("wcag_description", "WCAG guideline description"),
                                    "version": "2.2"
                                },
                                "pourPrinciple": issue.get("pour_principle", "Perceivable"),
                                "confidence": int(issue.get("confidence_score", 0.85) * 100),
                                "files": [{
                                    "fileId": f"file_{file_idx}",
                                    "fileName": file_name,
                                    "lineNumber": issue.get("line_number", 1),
                                    "codeSnippet": issue.get("code_snippet", f"Code from {file_name}"),
                                    "context": issue.get("context", f"Context in {file_name}")
                                }],
                                "suggestions": issue.get("suggestions", [
                                    "Review the identified accessibility issue",
                                    "Implement recommended fixes",
                                    "Test with assistive technologies"
                                ]),
                                "createdAt": issue.get("created_at", "2024-01-01T00:00:00Z")
                            }
                            
                            analysis_progress[session_id]["issues"].append(formatted_issue)
                        
                    except Exception as e:
                        logger.error(f"💥 [ANALYSIS SERVICE] Error with model {model_id}: {e}")
                        # Continue with other models even if one fails
                        continue
                    
                    # Update progress
                    analysis_progress[session_id]["progress"] = int((current_step / total_steps) * 100)
                    current_step += 1
                    
                    # Small delay to prevent overwhelming the API
                    await asyncio.sleep(0.5)
            
            # Step 3: Completion
            logger.info(f"✅ [ANALYSIS SERVICE] Analysis completed")
            analysis_progress[session_id]["progress"] = 100
            analysis_progress[session_id]["status"] = "completed"
            
            total_issues = len(analysis_progress[session_id]["issues"])
            logger.info(f"🎉 [ANALYSIS SERVICE] Generated {total_issues} real accessibility issues")
            
        except Exception as e:
            logger.error(f"💥 [ANALYSIS SERVICE] Analysis failed: {e}")
            analysis_progress[session_id]["status"] = "failed"
            analysis_progress[session_id]["error"] = str(e)
    
    def get_progress(self, session_id: str) -> Dict[str, Any]:
        """Get analysis progress for a session."""
        logger.info(f"📊 [ANALYSIS SERVICE] Getting progress for session {session_id}")
        
        if session_id not in analysis_progress:
            logger.warning(f"⚠️ [ANALYSIS SERVICE] Session {session_id} not found")
            return {
                "status": "not_found",
                "progress": 0,
                "issues": [],
                "error": "Session not found"
            }
        
        progress_data = analysis_progress[session_id]
        logger.info(f"📈 [ANALYSIS SERVICE] Progress: {progress_data['progress']}% - {progress_data['status']}")
        
        return progress_data
