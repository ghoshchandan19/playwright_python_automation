"""
Test fixtures and utilities for the ParaBank automation framework.
"""
import pytest
from playwright.sync_api import Page, Browser, BrowserContext
from src.pages.login_page import LoginPage
from src.pages.registration_page import RegistrationPage
from src.pages.home_page import HomePage
from src.pages.new_account_page import NewAccountPage


@pytest.fixture
def login_page(page: Page) -> LoginPage:
    """Provide a LoginPage instance."""
    return LoginPage(page)


@pytest.fixture
def registration_page(page: Page) -> RegistrationPage:
    """Provide a RegistrationPage instance."""
    return RegistrationPage(page)


@pytest.fixture
def home_page(page: Page) -> HomePage:
    """Provide a HomePage instance."""
    return HomePage(page)


@pytest.fixture
def new_account_page(page: Page) -> NewAccountPage:
    """Provide a NewAccountPage instance."""
    return NewAccountPage(page)


@pytest.fixture
def logged_in_page(page: Page, credentials: dict) -> Page:
    """
    Provide a page instance with user already logged in.
    
    Args:
        page: Playwright page instance
        credentials: User credentials dictionary
        
    Returns:
        Page instance with user logged in
    """
    login_page = LoginPage(page)
    login_page.login(credentials['username'], credentials['password'])
    return page


class TestHelper:
    """Helper class with common test utilities."""
    
    @staticmethod
    def wait_for_page_load(page: Page, timeout: int = 30000) -> None:
        """
        Wait for page to fully load.
        
        Args:
            page: Playwright page instance
            timeout: Timeout in milliseconds
        """
        page.wait_for_load_state('networkidle', timeout=timeout)
    
    @staticmethod
    def take_screenshot_on_failure(page: Page, test_name: str) -> None:
        """
        Take screenshot when test fails.
        
        Args:
            page: Playwright page instance
            test_name: Name of the test for screenshot naming
        """
        import datetime
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{test_name}_failure_{timestamp}.png"
        page.screenshot(path=f"screenshots/{filename}")
    
    @staticmethod
    def clear_browser_data(context: BrowserContext) -> None:
        """
        Clear browser data (cookies, storage, etc.).
        
        Args:
            context: Browser context instance
        """
        context.clear_cookies()
        context.clear_permissions()
    
    @staticmethod
    def setup_test_environment(page: Page) -> None:
        """
        Setup common test environment.
        
        Args:
            page: Playwright page instance
        """
        # Set viewport
        page.set_viewport_size({"width": 1920, "height": 1080})
        
        # Set default timeout
        page.set_default_timeout(30000)
        
        # Set default navigation timeout
        page.set_default_navigation_timeout(30000)
