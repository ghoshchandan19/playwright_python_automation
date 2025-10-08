"""
Base page class for all page objects in the ParaBank automation framework.
"""
from playwright.sync_api import Page, Locator, expect
from src.config.config import config


class BasePage:
    """Base page class that provides common functionality for all page objects."""
    
    def __init__(self, page: Page):
        """
        Initialize the base page.
        
        Args:
            page: Playwright page instance
        """
        self.page = page
        self.timeout = config.get_timeout()
    
    def navigate_to(self, url: str) -> None:
        """
        Navigate to a specific URL.
        
        Args:
            url: URL to navigate to
        """
        self.page.goto(url)
        self.page.wait_for_load_state('networkidle')
    
    def wait_for_element(self, locator: str, timeout: int = None) -> Locator:
        """
        Wait for an element to be visible and return it.
        
        Args:
            locator: Element locator
            timeout: Timeout in milliseconds
            
        Returns:
            Playwright locator
        """
        timeout = timeout or self.timeout
        element = self.page.locator(locator)
        element.wait_for(state='visible', timeout=timeout)
        return element
    
    def click_element(self, locator: str, timeout: int = None) -> None:
        """
        Click an element.
        
        Args:
            locator: Element locator
            timeout: Timeout in milliseconds
        """
        element = self.wait_for_element(locator, timeout)
        element.click()
    
    def fill_field(self, locator: str, value: str, timeout: int = None) -> None:
        """
        Fill a form field with a value.
        
        Args:
            locator: Element locator
            value: Value to fill
            timeout: Timeout in milliseconds
        """
        element = self.wait_for_element(locator, timeout)
        element.fill(value)
    
    def get_text(self, locator: str, timeout: int = None) -> str:
        """
        Get text content of an element.
        
        Args:
            locator: Element locator
            timeout: Timeout in milliseconds
            
        Returns:
            Text content of the element
        """
        element = self.wait_for_element(locator, timeout)
        return element.text_content()
    
    def is_element_visible(self, locator: str, timeout: int = None) -> bool:
        """
        Check if an element is visible.
        
        Args:
            locator: Element locator
            timeout: Timeout in milliseconds
            
        Returns:
            True if element is visible, False otherwise
        """
        try:
            element = self.page.locator(locator)
            element.wait_for(state='visible', timeout=timeout or self.timeout)
            return True
        except:
            return False
    
    def wait_for_title(self, title: str, timeout: int = None) -> None:
        """
        Wait for page title to match expected title.
        
        Args:
            title: Expected page title
            timeout: Timeout in milliseconds
        """
        expect(self.page).to_have_title(title, timeout=timeout or self.timeout)
    
    def wait_for_url(self, url: str, timeout: int = None) -> None:
        """
        Wait for page URL to match expected URL.
        
        Args:
            url: Expected URL
            timeout: Timeout in milliseconds
        """
        expect(self.page).to_have_url(url, timeout=timeout or self.timeout)
    
    def take_screenshot(self, filename: str = None) -> None:
        """
        Take a screenshot of the current page.
        
        Args:
            filename: Screenshot filename (optional)
        """
        if not filename:
            import datetime
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"screenshot_{timestamp}.png"
        
        self.page.screenshot(path=f"screenshots/{filename}")
    
    def select_option(self, locator: str, value: str, timeout: int = None) -> None:
        """
        Select an option from a dropdown.
        
        Args:
            locator: Element locator
            value: Option value to select
            timeout: Timeout in milliseconds
        """
        element = self.wait_for_element(locator, timeout)
        element.select_option(value)
    
    def get_attribute(self, locator: str, attribute: str, timeout: int = None) -> str:
        """
        Get an attribute value of an element.
        
        Args:
            locator: Element locator
            attribute: Attribute name
            timeout: Timeout in milliseconds
            
        Returns:
            Attribute value
        """
        element = self.wait_for_element(locator, timeout)
        return element.get_attribute(attribute)
