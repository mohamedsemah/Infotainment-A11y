#!/usr/bin/env python3
"""
Simple test to check if the analysis service works without authentication.
"""

import asyncio
import sys
import os

# Add the app directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.services.analysis_service import AnalysisService

async def test_analysis_service():
    print("🧪 Testing Analysis Service Directly")
    print("=" * 50)
    
    try:
        # Create analysis service
        service = AnalysisService()
        print("✅ Analysis service created successfully")
        
        # Test data
        session_id = "test_session_123"
        files = [
            {
                "name": "test.html",
                "content": "<div>Test content</div>",
                "type": "text/html",
                "size": 100
            }
        ]
        models = ["gpt-5"]
        user_id = "demo-user-123"
        
        print(f"📁 Files: {len(files)}")
        print(f"🤖 Models: {models}")
        
        # Start analysis
        await service.start_analysis_simple(session_id, files, models, user_id)
        print("✅ Analysis started successfully")
        
        # Check progress
        progress = service.get_progress(session_id)
        print(f"📊 Progress: {progress}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        print(f"💥 Traceback: {traceback.format_exc()}")
        return False

if __name__ == "__main__":
    result = asyncio.run(test_analysis_service())
    if result:
        print("\n🎉 Test passed!")
    else:
        print("\n💥 Test failed!")
