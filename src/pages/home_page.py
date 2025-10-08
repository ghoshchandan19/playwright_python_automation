"""
Home page object for ParaBank application.
"""
from playwright.sync_api import Page, expect
from src.pages.base_page import BasePage
from src.constants.application_constants import SELECTORS, PAGE_TITLES


class HomePage(BasePage):
    """Home page class for ParaBank navigation functionality."""
    
    def __init__(self, page: Page):
        """
        Initialize the home page.
        
        Args:
            page: Playwright page instance
        """
        super().__init__(page)
        self.homescreen_menu_link = page.locator(SELECTORS['NAVIGATION']['HOME_MENU'])
        self.emp_screen_link = page.locator(SELECTORS['NAVIGATION']['EMPLOYEE_MENU'])
        self.customer_screen_link = page.locator(SELECTORS['NAVIGATION']['CUSTOMER_MENU'])
    
    def verify_homescreen_menu(self) -> None:
        """
        Verify the home screen menu navigation.
        
        This method clicks on the home screen menu link and verifies
        that the page title contains "Welcome" and "Online Banking" to confirm
        successful navigation to the home page.
        """
        self.homescreen_menu_link.click()
        expect(self.page).to_have_title(PAGE_TITLES['HOME'])
    
    def verify_emp_screen(self) -> None:
        """
        Verify the employee screen navigation.
        
        This method clicks on the employee screen link and verifies
        that the page title is "ParaBank | About Us" to confirm successful
        navigation to the employee/about us page.
        """
        self.emp_screen_link.click()
        expect(self.page).to_have_title(PAGE_TITLES['ABOUT_US'])
    
    def verify_customer_screen(self) -> None:
        """
        Verify the customer screen navigation.
        
        This method clicks on the customer screen link and verifies
        that the page title is "ParaBank | Customer Care" to confirm successful
        navigation to the customer care page.
        """
        self.customer_screen_link.click()
        expect(self.page).to_have_title(PAGE_TITLES['CUSTOMER_CARE'])
