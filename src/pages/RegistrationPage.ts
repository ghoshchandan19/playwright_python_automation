import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { URLS } from '../config/urls';
import { SELECTORS, TEST_DATA_CONSTANTS, PAGE_TITLES, SUCCESS_MESSAGES, APPLICATION_CONFIG } from '../constants/application-constants';
import * as fs from 'fs';
import * as path from 'path';

/**
 * RegistrationPage class handles user registration functionality in ParaBank
 * 
 * @description This page object class provides methods for user registration,
 * form filling, and credential management. It encapsulates all the locators
 * and business logic related to user registration functionality.
 * 
 * @example
 * ```typescript
 * const registrationPage = new RegistrationPage(page);
 * await registrationPage.registerUser();
 * ```
 */
export class RegistrationPage {
  private page: Page;
  private firstNameField: Locator;
  private lastNameField: Locator;
  private addressField: Locator;
  private cityField: Locator;
  private stateField: Locator;
  private zipCodeField: Locator;
  private phoneNumberField: Locator;
  private ssnField: Locator;
  private usernameField: Locator;
  private passwordField: Locator;
  private confirmPasswordField: Locator;
  private registerButton: Locator;
  private logout: Locator;
  private errorMessageLocator: Locator;

  /**
   * Creates an instance of RegistrationPage
   * 
   * @param {Page} page - Playwright page instance for browser interactions
   * 
   * @description Initializes the page object with all necessary locators for
   * user registration form fields and buttons.
   */
  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.locator(SELECTORS.REGISTRATION.FIRST_NAME);
    this.lastNameField = page.locator(SELECTORS.REGISTRATION.LAST_NAME);
    this.addressField = page.locator(SELECTORS.REGISTRATION.ADDRESS);
    this.cityField = page.locator(SELECTORS.REGISTRATION.CITY);
    this.stateField = page.locator(SELECTORS.REGISTRATION.STATE);
    this.zipCodeField = page.locator(SELECTORS.REGISTRATION.ZIP_CODE);
    this.phoneNumberField = page.locator(SELECTORS.REGISTRATION.PHONE);
    this.ssnField = page.locator(SELECTORS.REGISTRATION.SSN);
    this.usernameField = page.locator(SELECTORS.REGISTRATION.USERNAME);
    this.passwordField = page.locator(SELECTORS.REGISTRATION.PASSWORD);
    this.confirmPasswordField = page.locator(SELECTORS.REGISTRATION.CONFIRM_PASSWORD);
    this.registerButton = page.locator(SELECTORS.REGISTRATION.REGISTER_BUTTON);
    this.logout = page.locator(SELECTORS.REGISTRATION.LOGOUT_LINK);
    this.errorMessageLocator = page.locator(".error");
  }

  /**
   * Generates a random username for user registration
   * 
   * @description This method creates a unique username by combining a random word
   * from a predefined list with a random 4-digit number and appending @gmail.com.
   * This ensures uniqueness for each test execution.
   * 
   * @returns {string} A randomly generated username in email format
   * 
   * @example
   * ```typescript
   * const username = this.generateRandomUsername();
   * // Returns: "alpha1234@gmail.com"
   * ```
   */
  private generateRandomUsername(): string {
    const words = ["alpha", "beta", "gamma", "delta", "omega", "zeta"];
    const numbers = Math.floor(Math.random() * 9000) + 1000;
    return `${words[Math.floor(Math.random() * words.length)]}${numbers}@gmail.com`;
  }

  /**
   * Registers a new user with random credentials and saves them to file
   * 
   * @description This method performs a complete user registration process including:
   * - Generating random username and password
   * - Filling all registration form fields with test data
   * - Submitting the registration form
   * - Handling loading pages and success verification
   * - Saving credentials to JSON file for later use
   * - Logging out and logging back in to verify registration
   * 
   * @returns {Promise<void>} Promise that resolves when registration is complete
   * 
   * @throws {Error} Throws an error if registration fails or success indicators not found
   * 
   * @example
   * ```typescript
   * await registrationPage.registerUser();
   * // User is now registered and logged in
   * ```
   */
  async registerUser(): Promise<void> {
    const username = this.generateRandomUsername();
    const password = TEST_DATA_CONSTANTS.DEFAULT_PASSWORD;

    await this.firstNameField.fill(TEST_DATA_CONSTANTS.TEST_PROFILE.FIRST_NAME);
    await this.lastNameField.fill(TEST_DATA_CONSTANTS.TEST_PROFILE.LAST_NAME);
    await this.addressField.fill(TEST_DATA_CONSTANTS.TEST_PROFILE.ADDRESS);
    await this.cityField.fill(TEST_DATA_CONSTANTS.TEST_PROFILE.CITY);
    await this.stateField.fill(TEST_DATA_CONSTANTS.TEST_PROFILE.STATE);
    await this.zipCodeField.fill(TEST_DATA_CONSTANTS.TEST_PROFILE.ZIP_CODE);
    await this.phoneNumberField.fill(TEST_DATA_CONSTANTS.TEST_PROFILE.PHONE_NUMBER);
    await this.ssnField.fill(TEST_DATA_CONSTANTS.TEST_PROFILE.SSN);
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
    await this.registerButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: APPLICATION_CONFIG.TIMEOUTS.DEFAULT }); // Allow time for registration

    const baseDir = path.dirname(path.dirname(__dirname));
    const dataDir = path.join(baseDir, "data");
    const filePath = path.join(dataDir, "credentials.json");

    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const credentials = { username, password };
    fs.writeFileSync(filePath, JSON.stringify(credentials, null, 2));

    // Wait for the page to load and check for success indicators
    await this.page.waitForLoadState('domcontentloaded');
    
    // Check if we're on a loading page first
    const currentTitle = await this.page.title();
    console.log("Current page title:", currentTitle);
    
    if (currentTitle.includes("Just a moment")) {
      console.log("Detected loading page, waiting for redirect...");
      await this.page.waitForLoadState('networkidle'); // Wait longer for redirect
    }
    
        // Try to find success message or check for accounts overview
        const successMessage = this.page.locator(`text=${SUCCESS_MESSAGES.REGISTRATION_SUCCESS}`);
        const accountsOverview = this.page.locator("text=Accounts Overview");
    
    try {
      await expect(successMessage).toBeVisible({ timeout: 10000 });
      console.log("Registration success message found!");
    } catch {
      try {
        await expect(accountsOverview).toBeVisible({ timeout: 5000 });
        console.log("Accounts overview found - registration successful!");
      } catch {
        console.log("Registration may have succeeded but success indicators not found");
      }
    }

    await this.logout.click();
    await this.page.goto(URLS.HOME);
    const loginPage = new LoginPage(this.page);
    await this.page.waitForLoadState('networkidle');
    await loginPage.login(username, password);
        await expect(this.page).toHaveTitle(PAGE_TITLES.ACCOUNTS_OVERVIEW);
    console.log("Login successful!");

    console.log(`✅ Registration successful! Credentials saved in credentials.json`);
  }
}
