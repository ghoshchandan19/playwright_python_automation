"""
Login page object for ParaBank application.
"""
from playwright.sync_api import Page
from src.pages.base_page import BasePage
from src.constants.application_constants import SELECTORS, APPLICATION_CONFIG


class LoginPage(BasePage):
    """Login page class for ParaBank user authentication functionality."""
    
    def __init__(self, page: Page):
        """
        Initialize the login page.
        
        Args:
            page: Playwright page instance
        """
        super().__init__(page)
        self.username_field = page.locator(SELECTORS['LOGIN']['USERNAME_FIELD'])
        self.password_field = page.locator(SELECTORS['LOGIN']['PASSWORD_FIELD'])
        self.login_button = page.locator(SELECTORS['LOGIN']['LOGIN_BUTTON'])
    
    def login(self, username: str, password: str) -> None:
        """
        Perform user login with provided credentials.
        
        This method fills in the username and password fields,
        waits for the network to be idle, and clicks the login button to
        authenticate the user. It also logs the credentials for debugging purposes.
        
        Args:
            username: The username to login with
            password: The password to login with
        """
        self.username_field.fill(username)
        self.password_field.fill(password)
        print(f"LOGIN USERNAME: {username}")
        print(f"LOGIN PASSWORD: {password}")
        
        self.page.wait_for_load_state('networkidle', timeout=APPLICATION_CONFIG['TIMEOUTS']['DEFAULT'])
        self.login_button.click()
    
    def is_login_form_visible(self) -> bool:
        """
        Check if the login form is visible.
        
        Returns:
            True if login form is visible, False otherwise
        """
        return self.is_element_visible(SELECTORS['LOGIN']['USERNAME_FIELD'])
    
    def get_login_error_message(self) -> str:
        """
        Get login error message if any.
        
        Returns:
            Error message text or empty string if no error
        """
        try:
            error_element = self.page.locator(".error")
            if error_element.is_visible():
                return error_element.text_content()
        except:
            pass
        return ""
