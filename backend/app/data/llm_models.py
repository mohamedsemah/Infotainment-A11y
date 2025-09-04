from app.models import LLMModel

# Available LLM Models
AVAILABLE_LLM_MODELS = [
    LLMModel(
        id="gpt-5",
        name="GPT-5",
        provider="OpenAI",
        description="OpenAI's most advanced language model with enhanced reasoning capabilities",
        max_tokens=128000,
        cost_per_token=0.00003
    ),
    LLMModel(
        id="claude-opus-4",
        name="Claude Opus 4",
        provider="Anthropic",
        description="Anthropic's most capable model for complex reasoning and analysis",
        max_tokens=200000,
        cost_per_token=0.000015
    ),
    LLMModel(
        id="gemini-2.5-pro",
        name="Gemini 2.5 Pro",
        provider="Google",
        description="Google's advanced multimodal AI model with strong analytical capabilities",
        max_tokens=1000000,
        cost_per_token=0.00000125
    ),
    LLMModel(
        id="grok-4",
        name="Grok 4",
        provider="xAI",
        description="xAI's latest model with real-time information access and reasoning",
        max_tokens=128000,
        cost_per_token=0.00001
    ),
    LLMModel(
        id="llama-4",
        name="Llama 4",
        provider="Meta",
        description="Meta's open-source large language model with strong performance",
        max_tokens=128000,
        cost_per_token=0.00002
    ),
    LLMModel(
        id="deepseek-v3.1",
        name="DeepSeek V3.1",
        provider="DeepSeek",
        description="DeepSeek's advanced model with strong coding and analysis capabilities",
        max_tokens=128000,
        cost_per_token=0.000014
    )
]

# Model configuration for API calls
LLM_CONFIGS = {
    "gpt-5": {
        "api_endpoint": "https://api.openai.com/v1/chat/completions",
        "model_name": "gpt-5",
        "headers": {
            "Authorization": "Bearer {api_key}",
            "Content-Type": "application/json"
        },
        "max_tokens": 4000,
        "temperature": 0.1
    },
    "claude-opus-4": {
        "api_endpoint": "https://api.anthropic.com/v1/messages",
        "model_name": "claude-3-opus-20240229",
        "headers": {
            "x-api-key": "{api_key}",
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01"
        },
        "max_tokens": 4000,
        "temperature": 0.1
    },
    "gemini-2.5-pro": {
        "api_endpoint": "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
        "model_name": "gemini-1.5-pro",
        "headers": {
            "Content-Type": "application/json"
        },
        "max_tokens": 4000,
        "temperature": 0.1
    },
    "grok-4": {
        "api_endpoint": "https://api.x.ai/v1/chat/completions",
        "model_name": "grok-beta",
        "headers": {
            "Authorization": "Bearer {api_key}",
            "Content-Type": "application/json"
        },
        "max_tokens": 4000,
        "temperature": 0.1
    },
    "llama-4": {
        "api_endpoint": "https://api.groq.com/openai/v1/chat/completions",
        "model_name": "llama-3-70b-8192",
        "headers": {
            "Authorization": "Bearer {api_key}",
            "Content-Type": "application/json"
        },
        "max_tokens": 4000,
        "temperature": 0.1
    },
    "deepseek-v3.1": {
        "api_endpoint": "https://api.deepseek.com/v1/chat/completions",
        "model_name": "deepseek-chat",
        "headers": {
            "Authorization": "Bearer {api_key}",
            "Content-Type": "application/json"
        },
        "max_tokens": 4000,
        "temperature": 0.1
    }
}
