#!/usr/bin/env python3
"""
Check analysis results.
"""

import requests

def check_analysis_results():
    print("🔍 Checking Analysis Results")
    print("=" * 50)
    
    try:
        response = requests.get(
            'http://localhost:8000/api/analysis/progress/debug_test_123',
            headers={'Authorization': 'Bearer demo-token'}
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Status: {result['status']}")
            print(f"📊 Progress: {result['progress']}%")
            print(f"🎯 Issues Found: {len(result['issues'])}")
            
            if result['issues']:
                print("\n📋 Sample Issues:")
                for i, issue in enumerate(result['issues'][:3]):  # Show first 3 issues
                    print(f"\n{i+1}. {issue['title']}")
                    print(f"   Severity: {issue['severity']}")
                    print(f"   WCAG: {issue['wcagGuideline']['guideline']}")
                    print(f"   Confidence: {issue['confidence']}%")
            else:
                print("⏳ Analysis still in progress or no issues found")
                
        else:
            print(f"❌ Error: {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_analysis_results()
