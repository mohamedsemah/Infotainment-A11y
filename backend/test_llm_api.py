#!/usr/bin/env python3
"""
Test LLM API calls directly to see if they're working.
"""

import asyncio
import sys
import os

# Add the app directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.services.llm_service import LLMService

async def test_llm_api():
    print("🤖 Testing LLM API Calls")
    print("=" * 50)
    
    service = LLMService()
    
    # Test with a simple prompt
    test_content = "<div>Test content</div>"
    test_file_type = "text/html"
    test_filename = "test.html"
    
    # Test GPT-5 first
    try:
        print("🔍 Testing GPT-5...")
        response = await service.analyze_accessibility(
            "gpt-5", test_content, test_file_type, test_filename
        )
        print(f"✅ GPT-5 Response: {response}")
        
        # Try to parse the response
        issues = service.parse_llm_response(response, "gpt-5")
        print(f"📝 Parsed Issues: {issues}")
        
    except Exception as e:
        print(f"❌ GPT-5 Error: {e}")
        import traceback
        print(f"💥 Traceback: {traceback.format_exc()}")
    
    print("\n" + "="*50)
    
    # Test Claude Opus 4
    try:
        print("🔍 Testing Claude Opus 4...")
        response = await service.analyze_accessibility(
            "claude-opus-4", test_content, test_file_type, test_filename
        )
        print(f"✅ Claude Response: {response}")
        
        # Try to parse the response
        issues = service.parse_llm_response(response, "claude-opus-4")
        print(f"📝 Parsed Issues: {issues}")
        
    except Exception as e:
        print(f"❌ Claude Error: {e}")
        import traceback
        print(f"💥 Traceback: {traceback.format_exc()}")

if __name__ == "__main__":
    asyncio.run(test_llm_api())
