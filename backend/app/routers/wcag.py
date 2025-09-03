from fastapi import APIRouter
from app.data.wcag22 import WCAG_22_GUIDELINES, POUR_PRINCIPLES
from app.data.llm_models import AVAILABLE_LLM_MODELS

router = APIRouter(prefix="/wcag", tags=["WCAG guidelines and models"])

@router.get("/guidelines")
async def get_wcag_guidelines():
    """Get all WCAG 2.2 guidelines."""
    return {
        "guidelines": [
            {
                "id": guideline.id,
                "title": guideline.title,
                "description": guideline.description,
                "level": guideline.level,
                "pour_principle": guideline.pour_principle.value,
                "success_criteria": guideline.success_criteria
            }
            for guideline in WCAG_22_GUIDELINES
        ]
    }

@router.get("/principles")
async def get_pour_principles():
    """Get POUR principles with their guidelines."""
    return {
        "principles": {
            principle.value: {
                "title": data["title"],
                "description": data["description"],
                "guidelines": [
                    {
                        "id": guideline.id,
                        "title": guideline.title,
                        "description": guideline.description,
                        "level": guideline.level
                    }
                    for guideline in data["guidelines"]
                ]
            }
            for principle, data in POUR_PRINCIPLES.items()
        }
    }

@router.get("/models")
async def get_available_models():
    """Get available LLM models for analysis."""
    return {
        "models": [
            {
                "id": model.id,
                "name": model.name,
                "provider": model.provider,
                "description": model.description,
                "max_tokens": model.max_tokens,
                "cost_per_token": model.cost_per_token
            }
            for model in AVAILABLE_LLM_MODELS
        ]
    }
