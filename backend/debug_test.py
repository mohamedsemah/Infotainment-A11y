#!/usr/bin/env python3
"""
Debug script to test the analysis endpoint and see detailed error information.
"""

import requests
import json

def test_analysis():
    print("🧪 Testing Analysis Endpoint with Debug Info")
    print("=" * 50)
    
    try:
        # Test data
        data = {
            "sessionId": "debug_test_123",
            "files": [
                {
                    "name": "test.html",
                    "content": "<div>Test content</div>",
                    "type": "text/html",
                    "size": 100
                }
            ],
            "models": ["gpt-5"]
        }
        
        print(f"📤 Sending request to: http://localhost:8000/api/analysis/start")
        print(f"📦 Data: {json.dumps(data, indent=2)}")
        
        response = requests.post(
            "http://localhost:8000/api/analysis/start",
            json=data,
            headers={"Authorization": "Bearer demo-token"},
            timeout=30
        )
        
        print(f"📡 Status Code: {response.status_code}")
        print(f"📄 Response Headers: {dict(response.headers)}")
        print(f"📝 Response Text: {response.text}")
        
        if response.status_code == 200:
            print("✅ Success!")
            return True
        else:
            print("❌ Failed!")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Backend server is not running")
        print("💡 Start the backend with: python run.py")
        return False
    except requests.exceptions.Timeout:
        print("❌ Timeout Error: Request took too long")
        return False
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return False

if __name__ == "__main__":
    test_analysis()
