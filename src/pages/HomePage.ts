import { Page, Locator, expect } from '@playwright/test';
import { SELECTORS, PAGE_TITLES } from '../constants/application-constants';

/**
 * HomePage class handles navigation and home screen functionality in ParaBank
 * 
 * @description This page object class provides methods for navigating through
 * the main menu options and verifying page titles. It encapsulates all the
 * locators and business logic related to home page navigation.
 * 
 * @example
 * ```typescript
 * const homePage = new HomePage(page);
 * await homePage.verifyHomescreenMenu();
 * ```
 */
export class HomePage {
  private page: Page;
  private homescreenMenuLink: Locator;
  private empScreenLink: Locator;
  private customerScreenLink: Locator;

  /**
   * Creates an instance of HomePage
   * 
   * @param {Page} page - Playwright page instance for browser interactions
   * 
   * @description Initializes the page object with necessary locators for
   * navigation menu links and page elements.
   */
  constructor(page: Page) {
    this.page = page;
    this.homescreenMenuLink = page.locator(SELECTORS.NAVIGATION.HOME_MENU);
    this.empScreenLink = page.locator(SELECTORS.NAVIGATION.EMPLOYEE_MENU);
    this.customerScreenLink = page.locator(SELECTORS.NAVIGATION.CUSTOMER_MENU);
  }

  /**
   * Verifies the home screen menu navigation
   * 
   * @description This method clicks on the home screen menu link and verifies
   * that the page title contains "Welcome" and "Online Banking" to confirm
   * successful navigation to the home page.
   * 
   * @returns {Promise<void>} Promise that resolves when navigation is verified
   * 
   * @example
   * ```typescript
   * await homePage.verifyHomescreenMenu();
   * ```
   */
  async verifyHomescreenMenu(): Promise<void> {
    await this.homescreenMenuLink.click();
    await expect(this.page).toHaveTitle(/Welcome.*Online Banking/);
  }

  /**
   * Verifies the employee screen navigation
   * 
   * @description This method clicks on the employee screen link and verifies
   * that the page title is "ParaBank | About Us" to confirm successful
   * navigation to the employee/about us page.
   * 
   * @returns {Promise<void>} Promise that resolves when navigation is verified
   * 
   * @example
   * ```typescript
   * await homePage.verifyEmpScreen();
   * ```
   */
  async verifyEmpScreen(): Promise<void> {
    await this.empScreenLink.click();
    await expect(this.page).toHaveTitle(PAGE_TITLES.ABOUT_US);
  }

  /**
   * Verifies the customer screen navigation
   * 
   * @description This method clicks on the customer screen link and verifies
   * that the page title is "ParaBank | Customer Care" to confirm successful
   * navigation to the customer care page.
   * 
   * @returns {Promise<void>} Promise that resolves when navigation is verified
   * 
   * @example
   * ```typescript
   * await homePage.verifyCustomerScreen();
   * ```
   */
  async verifyCustomerScreen(): Promise<void> {
    await this.customerScreenLink.click();
    await expect(this.page).toHaveTitle(PAGE_TITLES.CUSTOMER_CARE);
  }
}
