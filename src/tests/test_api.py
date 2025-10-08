"""
API test suite for ParaBank application.
"""
import os
import json
import pytest
import requests
from playwright.sync_api import APIRequestContext, expect
from src.config.urls import API_URLS


class TestParaBankAPI:
    """ParaBank API Test Suite."""
    
    @pytest.fixture(scope="class")
    def credentials(self):
        """Load test credentials from file."""
        credentials_file = os.path.join(os.path.dirname(__file__), "..", "..", "data", "credentials.json")
        
        if os.path.exists(credentials_file):
            with open(credentials_file, 'r') as f:
                return json.load(f)
        else:
            # Return demo credentials if file doesn't exist
            return {
                "username": "john",
                "password": "demo"
            }
    
    @pytest.fixture(scope="class")
    def session_id(self, request_context: APIRequestContext, credentials: dict):
        """
        Setup method that runs before all tests.
        
        This method performs initial authentication and extracts
        the JSESSIONID cookie for use in subsequent API calls. It validates
        the login response and ensures proper session management.
        """
        # Logs in and returns a valid JSESSIONID for reuse
        payload = {"username": credentials["username"], "password": credentials["password"]}
        response = request_context.post(API_URLS['LOGIN_URL'], data=payload)
        expect(response).to_be_ok()
        
        cookies = response.headers.get('set-cookie')
        if cookies:
            jsession_match = None
            for cookie in cookies:
                if 'JSESSIONID=' in cookie:
                    jsession_match = cookie.split('JSESSIONID=')[1].split(';')[0]
                    break
            
            if jsession_match:
                print(f"✅ Login successful! JSESSIONID: {jsession_match}")
                return jsession_match
            else:
                raise Exception("JSESSIONID not found in cookies")
        else:
            raise Exception("No cookies found")
    
    @pytest.mark.api
    @pytest.mark.smoke
    def test_login(self, session_id: str):
        """
        Login verification test.
        
        This test verifies that the login process was successful
        by checking that a valid session ID was obtained during the setup phase.
        """
        assert session_id, "Session ID should not be empty"
    
    @pytest.mark.api
    @pytest.mark.regression
    def test_get_accounts(self, request_context: APIRequestContext, session_id: str):
        """
        Get accounts API test.
        
        This test validates the accounts API endpoint by making
        an authenticated request to retrieve user account information. It verifies
        the response structure, data types, and account ID format.
        """
        headers = {
            "Accept": "application/json",
            "Cookie": f"JSESSIONID={session_id}",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        
        response = request_context.get(API_URLS['ACCOUNTS_API'], headers=headers)
        expect(response).to_be_ok()
        
        accounts = response.json()
        assert isinstance(accounts, list), "Accounts should be a list"
        
        account_ids = [account['id'] for account in accounts]
        assert len(account_ids) > 0, "Should have at least one account"
        assert all(isinstance(id, int) for id in account_ids), "All account IDs should be integers"
        
        print(f"✅ Account IDs: {account_ids}")
    
    @pytest.mark.api
    @pytest.mark.regression
    def test_account_details_structure(self, request_context: APIRequestContext, session_id: str):
        """
        Test account details structure and required fields.
        
        This test validates that account objects contain all required fields
        and have the correct data types.
        """
        headers = {
            "Accept": "application/json",
            "Cookie": f"JSESSIONID={session_id}",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        
        response = request_context.get(API_URLS['ACCOUNTS_API'], headers=headers)
        expect(response).to_be_ok()
        
        accounts = response.json()
        
        if accounts:  # Only test if accounts exist
            account = accounts[0]
            required_fields = ['id', 'type', 'balance']
            
            for field in required_fields:
                assert field in account, f"Account should have {field} field"
            
            assert isinstance(account['id'], int), "Account ID should be integer"
            assert isinstance(account['type'], str), "Account type should be string"
            assert isinstance(account['balance'], (int, float)), "Account balance should be numeric"
