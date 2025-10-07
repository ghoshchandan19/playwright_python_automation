/**
 * Core application types for ParaBank automation testing
 * 
 * @description This file contains all TypeScript interfaces and types used
 * throughout the test suite. It provides type safety and better IDE support
 * for all test components including page objects, test data, and API responses.
 */

/**
 * UserCredentials interface for authentication data
 * 
 * @description Defines the structure for user login credentials used in
 * authentication operations throughout the test suite.
 */
export interface UserCredentials {
  username: string;
  password: string;
}

/**
 * UserProfile interface for user registration data
 * 
 * @description Defines the structure for user profile information used in
 * registration forms and user data management operations.
 */
export interface UserProfile {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  ssn: string;
}

/**
 * AccountInfo interface for account data
 * 
 * @description Defines the structure for account information including
 * account ID, type, and balance used in account management operations.
 */
export interface AccountInfo {
  accountId: string;
  accountType: 'CHECKING' | 'SAVINGS';
  balance: number;
}

/**
 * TransferDetails interface for fund transfer operations
 * 
 * @description Defines the structure for fund transfer operations including
 * source account, destination account, and transfer amount.
 */
export interface TransferDetails {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}

/**
 * BillPaymentDetails interface for bill payment operations
 * 
 * @description Defines the structure for bill payment operations including
 * payee information, address details, and payment amount.
 */
export interface BillPaymentDetails {
  payeeName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  accountId: string;
  amount: number;
}

/**
 * Test configuration types
 */

/**
 * TestConfig interface for test configuration settings
 * 
 * @description Defines the structure for test configuration including
 * base URL, timeout settings, retry attempts, and browser mode.
 */
export interface TestConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
}

/**
 * API response types
 */

/**
 * ApiAccount interface for API account data
 * 
 * @description Defines the structure for account data returned from
 * API endpoints including account ID, type, and balance.
 */
export interface ApiAccount {
  id: number;
  type: string;
  balance: number;
}

/**
 * ApiResponse interface for generic API responses
 * 
 * @description Defines the structure for generic API responses including
 * data payload, status code, and optional message.
 * 
 * @template T - The type of data contained in the response
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * Page object types
 */

/**
 * BasePage interface for page object base functionality
 * 
 * @description Defines the base structure that all page objects should
 * implement, providing common functionality like page loading and screenshots.
 */
export interface BasePage {
  readonly page: Page;
  readonly pageTitle: string;
  waitForPageLoad(): Promise<void>;
  takeScreenshot(name: string): Promise<void>;
}

/**
 * Test data types
 */

/**
 * TestData interface for test data structure
 * 
 * @description Defines the structure for test data including valid/invalid
 * users, test profiles, and test amounts used throughout the test suite.
 */
export interface TestData {
  validUser: UserCredentials;
  invalidUser: UserCredentials;
  testProfile: UserProfile;
  testAmounts: {
    small: number;
    medium: number;
    large: number;
  };
}

/**
 * Re-export Playwright types for convenience
 * 
 * @description Re-exports commonly used Playwright types to provide
 * easy access throughout the test suite without additional imports.
 */
export type { Page, Locator, expect } from '@playwright/test';
