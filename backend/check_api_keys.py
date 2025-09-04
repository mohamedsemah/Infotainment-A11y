#!/usr/bin/env python3
"""
Check if API keys are properly loaded.
"""

import os
from app.config import settings

def check_api_keys():
    print("🔑 Checking API Keys Configuration")
    print("=" * 50)
    
    api_keys = {
        "OpenAI (GPT-5)": settings.openai_api_key,
        "Anthropic (Claude Opus 4)": settings.anthropic_api_key,
        "Google (Gemini 2.5 Pro)": settings.google_api_key,
        "Groq (Grok 4)": settings.groq_api_key,
        "Hugging Face (Llama 4)": settings.huggingface_api_key,
        "DeepSeek (V3.1)": settings.deepseek_api_key
    }
    
    for name, key in api_keys.items():
        if key and len(key) > 10:
            print(f"✅ {name}: {'*' * (len(key) - 8)}{key[-8:]}")
        else:
            print(f"❌ {name}: Not configured or too short")
    
    print("\n📁 Environment file check:")
    env_file = ".env"
    if os.path.exists(env_file):
        print(f"✅ {env_file} exists")
        with open(env_file, 'r') as f:
            content = f.read()
            for name in ["OPENAI_API_KEY", "ANTHROPIC_API_KEY", "GOOGLE_API_KEY", "GROQ_API_KEY", "HUGGINGFACE_API_KEY", "DEEPSEEK_API_KEY"]:
                if name in content:
                    print(f"✅ {name} found in .env")
                else:
                    print(f"❌ {name} not found in .env")
    else:
        print(f"❌ {env_file} does not exist")

if __name__ == "__main__":
    check_api_keys()
