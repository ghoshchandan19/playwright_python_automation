import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { HomePage } from '../pages/HomePage';
import { NewAccountPage } from '../pages/NewAccountPage';

/**
 * MyFixtures type definition for custom test fixtures
 * 
 * @description This type defines the custom fixtures available in tests,
 * providing instantiated page objects for each major component of the
 * ParaBank application. This allows tests to directly access page objects
 * without manual instantiation.
 */
type MyFixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  homePage: HomePage;
  newAccountPage: NewAccountPage;
};

/**
 * Extended test object with custom fixtures
 * 
 * @description This test object extends the base Playwright test with custom
 * fixtures that provide instantiated page objects. This eliminates the need
 * for manual page object instantiation in tests and ensures consistent setup.
 * 
 * @example
 * ```typescript
 * import { test } from '../fixtures/testFixtures';
 * 
 * test('example test', async ({ loginPage, homePage }) => {
 *   await loginPage.login('user', 'pass');
 *   await homePage.verifyHomescreenMenu();
 * });
 * ```
 */
export const test = base.extend<MyFixtures>({
  /**
   * LoginPage fixture
   * 
   * @description Provides an instantiated LoginPage object for authentication
   * operations in tests.
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * RegistrationPage fixture
   * 
   * @description Provides an instantiated RegistrationPage object for user
   * registration operations in tests.
   */
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },

  /**
   * HomePage fixture
   * 
   * @description Provides an instantiated HomePage object for navigation
   * and home screen operations in tests.
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  /**
   * NewAccountPage fixture
   * 
   * @description Provides an instantiated NewAccountPage object for account
   * management operations in tests.
   */
  newAccountPage: async ({ page }, use) => {
    const newAccountPage = new NewAccountPage(page);
    await use(newAccountPage);
  },
});

export { expect } from '@playwright/test';
