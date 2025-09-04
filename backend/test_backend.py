#!/usr/bin/env python3
"""
Test script to verify backend API endpoints are working.
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint."""
    print("🏥 Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def test_analysis_start():
    """Test the analysis start endpoint."""
    print("\n🚀 Testing analysis start...")
    try:
        data = {
            "sessionId": "test_session_123",
            "files": [
                {
                    "name": "test.html",
                    "content": "<div>Test content</div>",
                    "type": "text/html",
                    "size": 100
                }
            ],
            "models": ["gpt-5", "claude-opus-4"]
        }
        
        response = requests.post(
            f"{BASE_URL}/api/analysis/start",
            json=data,
            headers={"Authorization": "Bearer demo-token"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Analysis start failed: {e}")
        return False

def test_analysis_progress():
    """Test the analysis progress endpoint."""
    print("\n📊 Testing analysis progress...")
    try:
        response = requests.get(
            f"{BASE_URL}/api/analysis/progress/test_session_123",
            headers={"Authorization": "Bearer demo-token"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Analysis progress failed: {e}")
        return False

def main():
    print("🧪 Testing Backend API Endpoints")
    print("=" * 50)
    
    # Test health check
    health_ok = test_health_check()
    
    if not health_ok:
        print("\n❌ Backend is not running or not accessible")
        print("Please start the backend server with: python run.py")
        return
    
    # Test analysis endpoints
    start_ok = test_analysis_start()
    
    if start_ok:
        # Wait a bit for analysis to start
        print("\n⏳ Waiting for analysis to start...")
        time.sleep(2)
        
        # Test progress
        progress_ok = test_analysis_progress()
        
        if progress_ok:
            print("\n✅ All tests passed! Backend is working correctly.")
        else:
            print("\n⚠️ Analysis start worked but progress check failed.")
    else:
        print("\n❌ Analysis start failed.")

if __name__ == "__main__":
    main()
