/**
 * URLS configuration object for ParaBank application
 * 
 * @description This object contains all the main application URLs used throughout
 * the test suite. It provides a centralized location for URL management and
 * ensures consistency across all tests and page objects.
 * 
 * @example
 * ```typescript
 * import { URLS } from '../config/urls';
 * await page.goto(URLS.HOME);
 * ```
 */
export const URLS = {
  BASE_URL: 'https://parabank.parasoft.com',
  HOME: 'https://parabank.parasoft.com/',
  REGISTRATION: 'https://parabank.parasoft.com/parabank/register.htm',
  LOGIN: 'https://parabank.parasoft.com/parabank/index.htm',
  ACCOUNTS_OVERVIEW: 'https://parabank.parasoft.com/parabank/overview.htm',
  NEW_ACCOUNT: 'https://parabank.parasoft.com/parabank/openaccount.htm',
  TRANSFER_FUNDS: 'https://parabank.parasoft.com/parabank/transfer.htm',
  BILL_PAY: 'https://parabank.parasoft.com/parabank/billpay.htm',
  ABOUT_US: 'https://parabank.parasoft.com/parabank/about.htm',
  CUSTOMER_CARE: 'https://parabank.parasoft.com/parabank/contact.htm'
} as const;

/**
 * API_URLS configuration object for ParaBank API endpoints
 * 
 * @description This object contains all the API endpoints used for backend
 * testing and integration. It provides a centralized location for API URL
 * management and ensures consistency across all API tests.
 * 
 * @example
 * ```typescript
 * import { API_URLS } from '../config/urls';
 * const response = await request.get(API_URLS.ACCOUNTS_API);
 * ```
 */
export const API_URLS = {
  BASE_URL: 'https://parabank.parasoft.com/parabank',
  LOGIN_URL: 'https://parabank.parasoft.com/parabank/index.htm',
  ACCOUNTS_API: 'https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts'
} as const;
