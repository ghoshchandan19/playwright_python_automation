import { Page, Locator } from '@playwright/test';
import { SELECTORS, APPLICATION_CONFIG } from '../constants/application-constants';

/**
 * LoginPage class handles user authentication functionality in ParaBank
 * 
 * @description This page object class provides methods for user login,
 * credential input, and authentication. It encapsulates all the locators
 * and business logic related to user login functionality.
 * 
 * @example
 * ```typescript
 * const loginPage = new LoginPage(page);
 * await loginPage.login('username', 'password');
 * ```
 */
export class LoginPage {
  private page: Page;
  private usernameField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;

  /**
   * Creates an instance of LoginPage
   * 
   * @param {Page} page - Playwright page instance for browser interactions
   * 
   * @description Initializes the page object with necessary locators for
   * login form fields and buttons.
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator(SELECTORS.LOGIN.USERNAME_FIELD);
    this.passwordField = page.locator(SELECTORS.LOGIN.PASSWORD_FIELD);
    this.loginButton = page.locator(SELECTORS.LOGIN.LOGIN_BUTTON);
  }

  /**
   * Performs user login with provided credentials
   * 
   * @description This method fills in the username and password fields,
   * waits for the network to be idle, and clicks the login button to
   * authenticate the user. It also logs the credentials for debugging purposes.
   * 
   * @param {string} username - The username to login with
   * @param {string} password - The password to login with
   * 
   * @returns {Promise<void>} Promise that resolves when login is complete
   * 
   * @example
   * ```typescript
   * await loginPage.login('john', 'demo');
   * ```
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    console.log("LOGIN USERNAME", username);
    console.log("LOGIN PASSWORD", password);
    await this.page.waitForLoadState('networkidle', { timeout: APPLICATION_CONFIG.TIMEOUTS.DEFAULT });
    await this.loginButton.click();
  }
}
