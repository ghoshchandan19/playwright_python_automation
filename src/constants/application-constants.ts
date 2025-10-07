/**
 * APPLICATION_CONFIG object for application-wide configuration settings
 * 
 * @description This object contains application-wide configuration settings
 * including timeouts, retry attempts, and screenshot quality settings.
 * These constants ensure consistent behavior across all tests.
 */
export const APPLICATION_CONFIG = {
  NAME: 'ParaBank',
  VERSION: '1.0.0',
  TIMEOUTS: {
    DEFAULT: 30000,
    SHORT: 5000,
    LONG: 60000,
    NETWORK_IDLE: 1000
  },
  RETRY_ATTEMPTS: 3,
  SCREENSHOT_QUALITY: 80
} as const;

/**
 * TEST_DATA_CONSTANTS object for test data and default values
 * 
 * @description This object contains all test data constants including default
 * passwords, demo credentials, test profile information, and transaction amounts.
 * These constants provide consistent test data across all test scenarios.
 */
export const TEST_DATA_CONSTANTS = {
  DEFAULT_PASSWORD: 'Password123',
  DEMO_CREDENTIALS: {
    USERNAME: 'alex',
    PASSWORD: 'demo'
  },
  TEST_PROFILE: {
    FIRST_NAME: 'Alex',
    LAST_NAME: 'Doe',
    ADDRESS: '123 Test Street',
    CITY: 'Test City',
    STATE: 'Test State',
    ZIP_CODE: '12345',
    PHONE_NUMBER: '1234567890',
    SSN: '123-45-6789'
  },
  AMOUNTS: {
    SMALL: 100,
    MEDIUM: 500,
    LARGE: 1000
  }
} as const;

/**
 * SELECTORS object for all page element selectors
 * 
 * @description This object contains all CSS selectors and XPath expressions
 * used throughout the test suite. It provides a centralized location for
 * selector management and ensures consistency across all page objects.
 */
export const SELECTORS = {
  LOGIN: {
    USERNAME_FIELD: '//*[@id="loginPanel"]/form/div[1]/input',
    PASSWORD_FIELD: '//*[@id="loginPanel"]/form/div[2]/input',
    LOGIN_BUTTON: '//*[@id="loginPanel"]/form/div[3]/input'
  },
  REGISTRATION: {
    FIRST_NAME: "input[name='customer.firstName']",
    LAST_NAME: "input[name='customer.lastName']",
    ADDRESS: "input[name='customer.address.street']",
    CITY: "input[name='customer.address.city']",
    STATE: "input[name='customer.address.state']",
    ZIP_CODE: "input[name='customer.address.zipCode']",
    PHONE: "input[name='customer.phoneNumber']",
    SSN: "input[name='customer.ssn']",
    USERNAME: "input[name='customer.username']",
    PASSWORD: "input[name='customer.password']",
    CONFIRM_PASSWORD: "input[name='repeatedPassword']",
    REGISTER_BUTTON: '//*[@id="customerForm"]/table/tbody/tr[13]/td[2]/input',
    LOGOUT_LINK: '//*[@id="leftPanel"]/ul/li[8]/a'
  },
  NAVIGATION: {
    HOME_MENU: '//*[@id="headerPanel"]/ul[2]/li[1]/a',
    EMPLOYEE_MENU: '//*[@id="headerPanel"]/ul[2]/li[2]/a',
    CUSTOMER_MENU: '//*[@id="headerPanel"]/ul[2]/li[3]/a'
  },
  ACCOUNT: {
    NEW_ACCOUNT_MENU: "text=Open New Account",
    ACCOUNT_TYPE_DROPDOWN: "select[name='type']",
    OPEN_ACCOUNT_BUTTON: "input[type='button']",
    ACCOUNTS_OVERVIEW_LINK: "text=Accounts Overview"
  },
  TRANSFER: {
    TRANSFER_MENU: '//*[@id="leftPanel"]/ul/li[3]/a',
    AMOUNT_FIELD: '//*[@id="amount"]',
    FROM_ACCOUNT: '//*[@id="fromAccountId"]',
    TO_ACCOUNT: '//*[@id="toAccountId"]',
    TRANSFER_BUTTON: '//*[@id="transferForm"]/div[2]/input'
  },
  BILL_PAY: {
    BILL_PAY_MENU: '//*[@id="leftPanel"]/ul/li[4]/a',
    PAYEE_NAME: 'input[name="payee.name"]',
    PAYEE_ADDRESS: 'input[name="payee.address.street"]',
    PAYEE_CITY: 'input[name="payee.address.city"]',
    PAYEE_STATE: 'input[name="payee.address.state"]',
    PAYEE_ZIP: 'input[name="payee.address.zipCode"]',
    PAYEE_PHONE: 'input[name="phoneNumber"]',
    FROM_ACCOUNT: 'select[name="fromAccountId"]',
    AMOUNT: 'input[name="amount"]',
    SEND_PAYMENT_BUTTON: 'input[value="Send Payment"]'
  }
} as const;

/**
 * PAGE_TITLES object for expected page titles
 * 
 * @description This object contains all expected page titles used for
 * verification throughout the test suite. These constants ensure consistent
 * title validation across all tests and page objects.
 */
export const PAGE_TITLES = {
  HOME: 'ParaBank | Welcome | Online Banking',
  LOGIN: 'ParaBank | Welcome | Online Banking',
  REGISTRATION: 'ParaBank | Customer Created',
  ACCOUNTS_OVERVIEW: 'ParaBank | Accounts Overview',
  ABOUT_US: 'ParaBank | About Us',
  CUSTOMER_CARE: 'ParaBank | Customer Care'
} as const;

/**
 * SUCCESS_MESSAGES object for expected success messages
 * 
 * @description This object contains all expected success messages used for
 * verification throughout the test suite. These constants ensure consistent
 * message validation across all tests and page objects.
 */
export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'Your account was created successfully.',
  TRANSFER_SUCCESS: 'Transfer Complete!',
  PAYMENT_SUCCESS: 'Bill Payment Complete'
} as const;
