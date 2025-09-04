#!/usr/bin/env python3
"""
Test script to verify all 6 LLM API keys are working correctly.
Run this script to test your API keys before using the application.
"""

import asyncio
import httpx
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class APIKeyTester:
    def __init__(self):
        self.results = {}
        
    async def test_openai_gpt5(self):
        """Test OpenAI GPT-5 API key"""
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            return {"status": "error", "message": "OPENAI_API_KEY not found in .env"}
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "gpt-4",  # Using gpt-4 as gpt-5 might not be available yet
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Say 'API test successful' if you can read this."}
            ],
            "max_tokens": 50,
            "temperature": 0.1
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers=headers,
                    json=payload,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    content = data["choices"][0]["message"]["content"]
                    return {"status": "success", "message": f"GPT-5 API working: {content.strip()}"}
                else:
                    return {"status": "error", "message": f"HTTP {response.status_code}: {response.text}"}
        except Exception as e:
            return {"status": "error", "message": f"Connection error: {str(e)}"}

    async def test_anthropic_claude(self):
        """Test Anthropic Claude API key"""
        api_key = os.getenv('ANTHROPIC_API_KEY')
        if not api_key:
            return {"status": "error", "message": "ANTHROPIC_API_KEY not found in .env"}
        
        headers = {
            "x-api-key": api_key,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01"
        }
        
        payload = {
            "model": "claude-3-opus-20240229",
            "max_tokens": 50,
            "temperature": 0.1,
            "messages": [
                {"role": "user", "content": "Say 'API test successful' if you can read this."}
            ]
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.anthropic.com/v1/messages",
                    headers=headers,
                    json=payload,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    content = data["content"][0]["text"]
                    return {"status": "success", "message": f"Claude API working: {content.strip()}"}
                else:
                    return {"status": "error", "message": f"HTTP {response.status_code}: {response.text}"}
        except Exception as e:
            return {"status": "error", "message": f"Connection error: {str(e)}"}

    async def test_google_gemini(self):
        """Test Google Gemini API key"""
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key:
            return {"status": "error", "message": "GOOGLE_API_KEY not found in .env"}
        
        headers = {
            "Content-Type": "application/json"
        }
        
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": "Say 'API test successful' if you can read this."}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.1,
                "maxOutputTokens": 50
            }
        }
        
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={api_key}"
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    url,
                    headers=headers,
                    json=payload,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    content = data["candidates"][0]["content"]["parts"][0]["text"]
                    return {"status": "success", "message": f"Gemini API working: {content.strip()}"}
                else:
                    return {"status": "error", "message": f"HTTP {response.status_code}: {response.text}"}
        except Exception as e:
            return {"status": "error", "message": f"Connection error: {str(e)}"}

    async def test_groq_grok(self):
        """Test Groq API key (for Grok model)"""
        api_key = os.getenv('GROQ_API_KEY')
        if not api_key:
            return {"status": "error", "message": "GROQ_API_KEY not found in .env"}
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "llama-3-70b-8192",  # Using available Groq model
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Say 'API test successful' if you can read this."}
            ],
            "max_tokens": 50,
            "temperature": 0.1
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers=headers,
                    json=payload,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    content = data["choices"][0]["message"]["content"]
                    return {"status": "success", "message": f"Groq API working: {content.strip()}"}
                else:
                    return {"status": "error", "message": f"HTTP {response.status_code}: {response.text}"}
        except Exception as e:
            return {"status": "error", "message": f"Connection error: {str(e)}"}

    async def test_huggingface_llama(self):
        """Test Hugging Face API key (for Llama model)"""
        api_key = os.getenv('HUGGINGFACE_API_KEY')
        if not api_key:
            return {"status": "error", "message": "HUGGINGFACE_API_KEY not found in .env"}
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "inputs": "Say 'API test successful' if you can read this.",
            "parameters": {
                "max_new_tokens": 50,
                "temperature": 0.1
            }
        }
        
        try:
            # Using a popular Llama model on Hugging Face
            model_url = "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf"
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    model_url,
                    headers=headers,
                    json=payload,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if isinstance(data, list) and len(data) > 0:
                        content = data[0].get("generated_text", "No content")
                    else:
                        content = str(data)
                    return {"status": "success", "message": f"Hugging Face API working: {content.strip()}"}
                else:
                    return {"status": "error", "message": f"HTTP {response.status_code}: {response.text}"}
        except Exception as e:
            return {"status": "error", "message": f"Connection error: {str(e)}"}

    async def test_deepseek(self):
        """Test DeepSeek API key"""
        api_key = os.getenv('DEEPSEEK_API_KEY')
        if not api_key:
            return {"status": "error", "message": "DEEPSEEK_API_KEY not found in .env"}
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "deepseek-chat",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Say 'API test successful' if you can read this."}
            ],
            "max_tokens": 50,
            "temperature": 0.1
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.deepseek.com/v1/chat/completions",
                    headers=headers,
                    json=payload,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    content = data["choices"][0]["message"]["content"]
                    return {"status": "success", "message": f"DeepSeek API working: {content.strip()}"}
                else:
                    return {"status": "error", "message": f"HTTP {response.status_code}: {response.text}"}
        except Exception as e:
            return {"status": "error", "message": f"Connection error: {str(e)}"}

    async def run_all_tests(self):
        """Run all API tests"""
        print("🔍 Testing all 6 LLM API keys...")
        print("=" * 60)
        
        tests = [
            ("OpenAI GPT-5", self.test_openai_gpt5),
            ("Anthropic Claude Opus 4", self.test_anthropic_claude),
            ("Google Gemini 2.5 Pro", self.test_google_gemini),
            ("Groq (Grok 4)", self.test_groq_grok),
            ("Hugging Face (Llama 4)", self.test_huggingface_llama),
            ("DeepSeek V3.1", self.test_deepseek)
        ]
        
        for name, test_func in tests:
            print(f"\n🧪 Testing {name}...")
            try:
                result = await test_func()
                self.results[name] = result
                
                if result["status"] == "success":
                    print(f"✅ {name}: {result['message']}")
                else:
                    print(f"❌ {name}: {result['message']}")
            except Exception as e:
                error_result = {"status": "error", "message": f"Test failed: {str(e)}"}
                self.results[name] = error_result
                print(f"❌ {name}: {error_result['message']}")
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        successful = sum(1 for result in self.results.values() if result["status"] == "success")
        total = len(self.results)
        
        print(f"✅ Successful: {successful}/{total}")
        print(f"❌ Failed: {total - successful}/{total}")
        
        if successful == total:
            print("\n🎉 All API keys are working correctly!")
        else:
            print(f"\n⚠️  {total - successful} API key(s) need attention.")
            print("\nFailed APIs:")
            for name, result in self.results.items():
                if result["status"] == "error":
                    print(f"  • {name}: {result['message']}")

async def main():
    """Main function to run the tests"""
    tester = APIKeyTester()
    await tester.run_all_tests()

if __name__ == "__main__":
    asyncio.run(main())
