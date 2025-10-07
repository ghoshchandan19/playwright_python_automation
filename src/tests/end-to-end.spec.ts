import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { NewAccountPage } from '../pages/NewAccountPage';
import { URLS } from '../config/urls';
import { PAGE_TITLES, TEST_DATA_CONSTANTS } from '../constants/application-constants';

/**
 * ParaBank End-to-End Test Suite
 * 
 * @description This test suite contains comprehensive end-to-end tests that
 * validate the complete user journey from registration through account
 * management operations in the ParaBank application.
 */
test.describe('ParaBank End-to-End Tests', () => {
  /**
   * Complete user journey test from registration to account management
   * 
   * @description This test performs a comprehensive user journey including:
   * - Navigation to homepage
   * - User registration with random credentials
   * - Login verification
   * - Navigation menu testing
   * - Account creation and management
   * - Fund transfers and bill payments
   * 
   * @param {Page} page - Playwright page instance
   */
  test('Complete user journey: Registration to Account Management', async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto(URLS.HOME);
    await expect(page).toHaveTitle(PAGE_TITLES.HOME);

    // Step 2: Register a new user
    await page.goto(URLS.REGISTRATION);
    const registrationPage = new RegistrationPage(page);
    await registrationPage.registerUser();

    // Step 3: Verify successful registration and login
    // Note: The success message might vary, so we'll check for the accounts overview page
    await expect(page).toHaveTitle(PAGE_TITLES.ACCOUNTS_OVERVIEW);

    // Step 4: Test navigation menu
    const homePage = new HomePage(page);
    await homePage.verifyHomescreenMenu();
    await homePage.verifyEmpScreen();
    await homePage.verifyCustomerScreen();

    // Step 5: Create a new savings account
    const newAccountPage = new NewAccountPage(page);
    const accountId = await newAccountPage.createSavingsAccount();
    expect(accountId).toBeTruthy();

    // Step 6: Perform account calculations
    const accountIds = await newAccountPage.calculations();
    expect(accountIds.length).toBeGreaterThan(0);

    // Step 7: Transfer funds (if multiple accounts exist)
    if (accountIds.length >= 2) {
      await newAccountPage.transferFunds(accountIds);
    }

    // Step 8: Pay bills
    if (accountIds.length > 0) {
      await newAccountPage.payBill(accountIds);
    }
  });

  /**
   * Login test with existing demo credentials
   * 
   * @description This test verifies login functionality using the ParaBank
   * demo credentials (john/demo) to ensure the login system is working
   * correctly for existing users.
   * 
   * @param {Page} page - Playwright page instance
   */
  test('Login with existing credentials', async ({ page }) => {
    // This test assumes credentials.json exists from previous registration
    await page.goto(URLS.HOME);
    
    const loginPage = new LoginPage(page);
    // Use valid ParaBank demo credentials
    await loginPage.login(TEST_DATA_CONSTANTS.DEMO_CREDENTIALS.username, TEST_DATA_CONSTANTS.DEMO_CREDENTIALS.password);
    
    // Verify successful login
    await expect(page).toHaveTitle(PAGE_TITLES.ACCOUNTS_OVERVIEW);
  });

  /**
   * Navigation menu functionality test
   * 
   * @description This test verifies that all navigation menu options work
   * correctly by testing the home screen, employee screen, and customer
   * screen navigation links and their corresponding page titles.
   * 
   * @param {Page} page - Playwright page instance
   */
  test('Navigation menu functionality', async ({ page }) => {
    await page.goto(URLS.HOME);
    
    const homePage = new HomePage(page);
    
    // Test all navigation options
    await homePage.verifyHomescreenMenu();
    await homePage.verifyEmpScreen();
    await homePage.verifyCustomerScreen();
  });
});