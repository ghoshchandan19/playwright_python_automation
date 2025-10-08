"""
Registration page object for ParaBank application.
"""
import os
import json
from playwright.sync_api import Page, expect
from src.pages.base_page import BasePage
from src.pages.login_page import LoginPage
from src.config.urls import URLs
from src.constants.application_constants import (
    SELECTORS, TEST_DATA_CONSTANTS, PAGE_TITLES, 
    SUCCESS_MESSAGES, APPLICATION_CONFIG
)


class RegistrationPage(BasePage):
    """Registration page class for ParaBank user registration functionality."""
    
    def __init__(self, page: Page):
        """
        Initialize the registration page.
        
        Args:
            page: Playwright page instance
        """
        super().__init__(page)
        self.first_name_field = page.locator(SELECTORS['REGISTRATION']['FIRST_NAME'])
        self.last_name_field = page.locator(SELECTORS['REGISTRATION']['LAST_NAME'])
        self.address_field = page.locator(SELECTORS['REGISTRATION']['ADDRESS'])
        self.city_field = page.locator(SELECTORS['REGISTRATION']['CITY'])
        self.state_field = page.locator(SELECTORS['REGISTRATION']['STATE'])
        self.zip_code_field = page.locator(SELECTORS['REGISTRATION']['ZIP_CODE'])
        self.phone_number_field = page.locator(SELECTORS['REGISTRATION']['PHONE'])
        self.ssn_field = page.locator(SELECTORS['REGISTRATION']['SSN'])
        self.username_field = page.locator(SELECTORS['REGISTRATION']['USERNAME'])
        self.password_field = page.locator(SELECTORS['REGISTRATION']['PASSWORD'])
        self.confirm_password_field = page.locator(SELECTORS['REGISTRATION']['CONFIRM_PASSWORD'])
        self.register_button = page.locator(SELECTORS['REGISTRATION']['REGISTER_BUTTON'])
        self.logout = page.locator(SELECTORS['REGISTRATION']['LOGOUT_LINK'])
        self.error_message_locator = page.locator(".error")
    
    def _generate_random_username(self) -> str:
        """
        Generate a random username for user registration.
        
        Returns:
            A randomly generated username in email format
        """
        words = ["alpha", "beta", "gamma", "delta", "omega", "zeta"]
        numbers = str(1000 + (hash(str(self.page)) % 9000))  # Use page hash for uniqueness
        return f"{words[hash(str(self.page)) % len(words)]}{numbers}@gmail.com"
    
    def register_user(self) -> None:
        """
        Register a new user with random credentials and save them to file.
        
        This method performs a complete user registration process including:
        - Generating random username and password
        - Filling all registration form fields with test data
        - Submitting the registration form
        - Handling loading pages and success verification
        - Saving credentials to JSON file for later use
        - Logging out and logging back in to verify registration
        """
        username = self._generate_random_username()
        password = TEST_DATA_CONSTANTS['DEFAULT_PASSWORD']
        
        # Fill registration form
        self.first_name_field.fill(TEST_DATA_CONSTANTS['TEST_PROFILE']['FIRST_NAME'])
        self.last_name_field.fill(TEST_DATA_CONSTANTS['TEST_PROFILE']['LAST_NAME'])
        self.address_field.fill(TEST_DATA_CONSTANTS['TEST_PROFILE']['ADDRESS'])
        self.city_field.fill(TEST_DATA_CONSTANTS['TEST_PROFILE']['CITY'])
        self.state_field.fill(TEST_DATA_CONSTANTS['TEST_PROFILE']['STATE'])
        self.zip_code_field.fill(TEST_DATA_CONSTANTS['TEST_PROFILE']['ZIP_CODE'])
        self.phone_number_field.fill(TEST_DATA_CONSTANTS['TEST_PROFILE']['PHONE_NUMBER'])
        self.ssn_field.fill(TEST_DATA_CONSTANTS['TEST_PROFILE']['SSN'])
        self.username_field.fill(username)
        self.password_field.fill(password)
        self.confirm_password_field.fill(password)
        
        self.register_button.click()
        self.page.wait_for_load_state('networkidle', timeout=APPLICATION_CONFIG['TIMEOUTS']['DEFAULT'])
        
        # Save credentials to file
        self._save_credentials(username, password)
        
        # Wait for the page to load and check for success indicators
        self.page.wait_for_load_state('domcontentloaded')
        
        # Check if we're on a loading page first
        current_title = self.page.title()
        print(f"Current page title: {current_title}")
        
        if "Just a moment" in current_title:
            print("Detected loading page, waiting for redirect...")
            self.page.wait_for_load_state('networkidle')
        
        # Try to find success message or check for accounts overview
        success_message = self.page.locator(f"text={SUCCESS_MESSAGES['REGISTRATION_SUCCESS']}")
        accounts_overview = self.page.locator("text=Accounts Overview")
        
        try:
            expect(success_message).to_be_visible(timeout=10000)
            print("Registration success message found!")
        except:
            try:
                expect(accounts_overview).to_be_visible(timeout=5000)
                print("Accounts overview found - registration successful!")
            except:
                print("Registration may have succeeded but success indicators not found")
        
        # Logout and login again to verify registration
        self.logout.click()
        self.navigate_to(URLs.HOME)
        login_page = LoginPage(self.page)
        self.page.wait_for_load_state('networkidle')
        login_page.login(username, password)
        expect(self.page).to_have_title(PAGE_TITLES['ACCOUNTS_OVERVIEW'])
        print("Login successful!")
        
        print(f"✅ Registration successful! Credentials saved in credentials.json")
    
    def _save_credentials(self, username: str, password: str) -> None:
        """
        Save user credentials to JSON file.
        
        Args:
            username: Username to save
            password: Password to save
        """
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        data_dir = os.path.join(base_dir, "data")
        file_path = os.path.join(data_dir, "credentials.json")
        
        # Ensure directory exists
        os.makedirs(data_dir, exist_ok=True)
        
        credentials = {"username": username, "password": password}
        with open(file_path, 'w') as f:
            json.dump(credentials, f, indent=2)
