"""
End-to-end test suite for ParaBank application.
"""
import pytest
from playwright.sync_api import Page, expect
from src.pages.registration_page import RegistrationPage
from src.pages.login_page import LoginPage
from src.pages.home_page import HomePage
from src.pages.new_account_page import NewAccountPage
from src.config.urls import URLS
from src.constants.application_constants import PAGE_TITLES, TEST_DATA_CONSTANTS


class TestParaBankEndToEnd:
    """ParaBank End-to-End Test Suite."""
    
    @pytest.mark.ui
    @pytest.mark.regression
    def test_complete_user_journey_registration_to_account_management(self, page: Page):
        """
        Complete user journey test from registration to account management.
        
        This test performs a comprehensive user journey including:
        - Navigation to homepage
        - User registration with random credentials
        - Login verification
        - Navigation menu testing
        - Account creation and management
        - Fund transfers and bill payments
        """
        # Step 1: Navigate to homepage
        page.goto(URLS['HOME'])
        expect(page).to_have_title(PAGE_TITLES['HOME'])
        
        # Step 2: Register a new user
        page.goto(URLS['REGISTRATION'])
        registration_page = RegistrationPage(page)
        registration_page.register_user()
        
        # Step 3: Verify successful registration and login
        # Note: The success message might vary, so we'll check for the accounts overview page
        expect(page).to_have_title(PAGE_TITLES['ACCOUNTS_OVERVIEW'])
        
        # Step 4: Test navigation menu
        home_page = HomePage(page)
        home_page.verify_homescreen_menu()
        home_page.verify_emp_screen()
        home_page.verify_customer_screen()
        
        # Step 5: Create a new savings account
        new_account_page = NewAccountPage(page)
        account_id = new_account_page.create_savings_account()
        assert account_id, "Account ID should not be empty"
        
        # Step 6: Perform account calculations
        account_ids = new_account_page.calculations()
        assert len(account_ids) > 0, "Should have at least one account"
        
        # Step 7: Transfer funds (if multiple accounts exist)
        if len(account_ids) >= 2:
            new_account_page.transfer_funds(account_ids)
        
        # Step 8: Pay bills
        if account_ids:
            new_account_page.pay_bill(account_ids)
    
    @pytest.mark.ui
    @pytest.mark.smoke
    def test_login_with_existing_credentials(self, page: Page, credentials: dict):
        """
        Login test with existing demo credentials.
        
        This test verifies login functionality using the ParaBank
        demo credentials (john/demo) to ensure the login system is working
        correctly for existing users.
        """
        page.goto(URLS['HOME'])
        
        login_page = LoginPage(page)
        # Use valid ParaBank demo credentials
        login_page.login(credentials['username'], credentials['password'])
        
        # Verify successful login
        expect(page).to_have_title(PAGE_TITLES['ACCOUNTS_OVERVIEW'])
    
    @pytest.mark.ui
    @pytest.mark.smoke
    def test_navigation_menu_functionality(self, page: Page):
        """
        Navigation menu functionality test.
        
        This test verifies that all navigation menu options work
        correctly by testing the home screen, employee screen, and customer
        screen navigation links and their corresponding page titles.
        """
        page.goto(URLS['HOME'])
        
        home_page = HomePage(page)
        
        # Test all navigation options
        home_page.verify_homescreen_menu()
        home_page.verify_emp_screen()
        home_page.verify_customer_screen()
