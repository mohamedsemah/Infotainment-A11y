import httpx
import json
from typing import Dict, List, Any, Optional
from app.config import settings
from app.data.llm_models import LLM_CONFIGS

class LLMService:
    def __init__(self):
        self.api_keys = {
            "gpt-5": settings.openai_api_key,
            "claude-opus-4": settings.anthropic_api_key,
            "gemini-2.5-pro": settings.google_api_key,
            "grok-4": settings.groq_api_key,
            "llama-4": settings.huggingface_api_key,  # Using Hugging Face for Llama
            "deepseek-v3.1": settings.deepseek_api_key
        }
    
    async def analyze_accessibility(
        self, 
        model_id: str, 
        content: str, 
        file_type: str,
        filename: str
    ) -> Dict[str, Any]:
        """Analyze content for accessibility issues using the specified LLM."""
        if model_id not in LLM_CONFIGS:
            raise ValueError(f"Unsupported model: {model_id}")
        
        config = LLM_CONFIGS[model_id]
        api_key = self.api_keys.get(model_id)
        
        if not api_key:
            raise ValueError(f"API key not configured for model: {model_id}")
        
        # Prepare the prompt
        prompt = self._create_accessibility_prompt(content, file_type, filename)
        
        # Make API call based on model
        if model_id == "gpt-5":
            return await self._call_openai(config, api_key, prompt)
        elif model_id == "claude-opus-4":
            return await self._call_anthropic(config, api_key, prompt)
        elif model_id == "gemini-2.5-pro":
            return await self._call_google(config, api_key, prompt)
        elif model_id == "grok-4":
            return await self._call_grok(config, api_key, prompt)
        elif model_id == "llama-4":
            return await self._call_groq_llama(config, api_key, prompt)
        elif model_id == "deepseek-v3.1":
            return await self._call_deepseek(config, api_key, prompt)
        else:
            raise ValueError(f"Unsupported model: {model_id}")
    
    def _create_accessibility_prompt(self, content: str, file_type: str, filename: str) -> str:
        """Create a comprehensive accessibility analysis prompt."""
        return f"""
You are an expert accessibility analyst specializing in WCAG 2.2 compliance for infotainment systems. Analyze the following {file_type} file for accessibility issues.

File: {filename}
Content:
{content}

Please analyze this content for accessibility issues according to WCAG 2.2 guidelines. For each issue found, provide:

1. WCAG Guideline ID (e.g., "1.4.3 Contrast (Minimum)")
2. POUR Principle (Perceivable, Operable, Understandable, or Robust)
3. Severity Level (low, medium, high, critical)
4. Issue Title (brief description)
5. Detailed Description of the issue
6. Specific line number or location (if applicable)
7. Code snippet showing the problematic area
8. Suggested fix or improvement
9. Confidence score (0.0 to 1.0)

Focus on issues relevant to infotainment systems such as:
- Touch target sizes
- Color contrast
- Keyboard navigation
- Screen reader compatibility
- Audio/video accessibility
- Form accessibility
- Navigation structure
- Error handling
- Language specification
- Focus management

Return your analysis as a JSON array of issues. If no issues are found, return an empty array.

Example format:
[
  {{
    "wcag_guideline": "1.4.3 Contrast (Minimum)",
    "pour_principle": "perceivable",
    "severity": "high",
    "title": "Insufficient color contrast",
    "description": "The text color #999999 on white background has a contrast ratio of 2.85:1, which is below the WCAG AA requirement of 4.5:1.",
    "line_number": 15,
    "code_snippet": "color: #999999;",
    "suggestion": "Use a darker color such as #666666 or #333333 to achieve at least 4.5:1 contrast ratio.",
    "confidence_score": 0.95
  }}
]

Provide only the JSON array, no additional text.
"""
    
    async def _call_openai(self, config: Dict, api_key: str, prompt: str) -> Dict[str, Any]:
        """Call OpenAI API."""
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": config["model_name"],
            "messages": [
                {"role": "system", "content": "You are an expert accessibility analyst. Always respond with valid JSON."},
                {"role": "user", "content": prompt}
            ],
            "max_completion_tokens": config.get("max_completion_tokens", config.get("max_tokens", 4000))
        }
        
        # Add temperature only if it exists in config
        if "temperature" in config:
            payload["temperature"] = config["temperature"]
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                config["api_endpoint"],
                headers=headers,
                json=payload,
                timeout=60.0
            )
            response.raise_for_status()
            return response.json()
    
    async def _call_anthropic(self, config: Dict, api_key: str, prompt: str) -> Dict[str, Any]:
        """Call Anthropic API."""
        headers = {
            "x-api-key": api_key,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01"
        }
        
        payload = {
            "model": config["model_name"],
            "max_tokens": config.get("max_tokens", 4000),
            "temperature": config.get("temperature", 0.1),
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                config["api_endpoint"],
                headers=headers,
                json=payload,
                timeout=60.0
            )
            response.raise_for_status()
            return response.json()
    
    async def _call_google(self, config: Dict, api_key: str, prompt: str) -> Dict[str, Any]:
        """Call Google Gemini API."""
        headers = {
            "Content-Type": "application/json"
        }
        
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": config.get("temperature", 0.1),
                "maxOutputTokens": config.get("max_tokens", 4000)
            }
        }
        
        url = f"{config['api_endpoint']}?key={api_key}"
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url,
                headers=headers,
                json=payload,
                timeout=60.0
            )
            response.raise_for_status()
            return response.json()
    
    async def _call_grok(self, config: Dict, api_key: str, prompt: str) -> Dict[str, Any]:
        """Call Grok API."""
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": config["model_name"],
            "messages": [
                {"role": "system", "content": "You are an expert accessibility analyst. Always respond with valid JSON."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": config.get("max_tokens", 4000),
            "temperature": config.get("temperature", 0.1)
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                config["api_endpoint"],
                headers=headers,
                json=payload,
                timeout=60.0
            )
            response.raise_for_status()
            return response.json()
    
    async def _call_groq_llama(self, config: Dict, api_key: str, prompt: str) -> Dict[str, Any]:
        """Call Groq API for Llama model."""
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": config["model_name"],
            "messages": [
                {"role": "system", "content": "You are an expert accessibility analyst. Always respond with valid JSON."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": config.get("max_tokens", 4000),
            "temperature": config.get("temperature", 0.1)
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                config["api_endpoint"],
                headers=headers,
                json=payload,
                timeout=60.0
            )
            response.raise_for_status()
            return response.json()
    
    async def _call_deepseek(self, config: Dict, api_key: str, prompt: str) -> Dict[str, Any]:
        """Call DeepSeek API."""
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": config["model_name"],
            "messages": [
                {"role": "system", "content": "You are an expert accessibility analyst. Always respond with valid JSON."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": config.get("max_tokens", 4000),
            "temperature": config.get("temperature", 0.1)
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                config["api_endpoint"],
                headers=headers,
                json=payload,
                timeout=60.0
            )
            response.raise_for_status()
            return response.json()
    
    def parse_llm_response(self, response: Dict[str, Any], model_id: str) -> List[Dict[str, Any]]:
        """Parse LLM response and extract accessibility issues."""
        try:
            if model_id == "gpt-5":
                content = response["choices"][0]["message"]["content"]
            elif model_id == "claude-opus-4":
                content = response["content"][0]["text"]
            elif model_id == "gemini-2.5-pro":
                content = response["candidates"][0]["content"]["parts"][0]["text"]
            elif model_id == "grok-4":
                content = response["choices"][0]["message"]["content"]
            elif model_id == "llama-4":
                content = response["choices"][0]["message"]["content"]
            elif model_id == "deepseek-v3.1":
                content = response["choices"][0]["message"]["content"]
            else:
                return []
            
            # Clean content - remove markdown code blocks if present
            content = content.strip()
            if content.startswith("```json"):
                content = content[7:]  # Remove ```json
            if content.startswith("```"):
                content = content[3:]   # Remove ```
            if content.endswith("```"):
                content = content[:-3]  # Remove trailing ```
            content = content.strip()
            
            # Parse JSON response
            issues = json.loads(content)
            if isinstance(issues, list):
                return issues
            else:
                return []
                
        except (KeyError, IndexError, json.JSONDecodeError) as e:
            print(f"Error parsing LLM response: {e}")
            print(f"Content that failed to parse: {content[:200]}...")
            return []
