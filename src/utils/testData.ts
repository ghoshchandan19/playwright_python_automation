/**
 * Generates a random username for testing purposes
 * 
 * @description This function creates a random username by combining random
 * alphanumeric characters and appending @gmail.com. This ensures unique
 * usernames for each test execution and prevents conflicts with existing users.
 * 
 * @param {number} length - The length of the random string (default: 8)
 * @returns {string} A randomly generated username in email format
 * 
 * @example
 * ```typescript
 * const username = generateRandomUsername(10);
 * // Returns: "abc123def4@gmail.com"
 * ```
 */
export function generateRandomUsername(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${result}@gmail.com`;
}

/**
 * Credentials interface for user authentication data
 * 
 * @description This interface defines the structure for user credentials
 * used throughout the test suite. It provides type safety for username
 * and password fields in authentication operations.
 */
export interface Credentials {
  username: string;
  password: string;
}

/**
 * TEST_DATA configuration object for test constants and default values
 * 
 * @description This object contains all the test data constants used throughout
 * the test suite including URLs, default passwords, and default user information.
 * It provides a centralized location for test data management and ensures
 * consistency across all tests.
 * 
 * @example
 * ```typescript
 * import { TEST_DATA } from '../utils/testData';
 * await page.goto(TEST_DATA.BASE_URL);
 * ```
 */
import { URLS } from '../config/urls';

export const TEST_DATA = {
  BASE_URL: URLS.BASE_URL,
  LOGIN_URL: URLS.LOGIN,
  REGISTRATION_URL: URLS.REGISTRATION,
  DEFAULT_PASSWORD: 'Password123',
  DEFAULT_USER: {
    firstName: 'Alex',
    lastName: 'Doe',
    address: '123 Test St',
    city: 'Test City',
    state: 'Test State',
    zipCode: '12345',
    phoneNumber: '1234567890',
    ssn: '123-45-6789'
  }
};