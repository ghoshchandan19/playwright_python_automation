import { UserCredentials, UserProfile } from '../types';
import { TEST_DATA_CONSTANTS } from '../constants/application-constants';

/**
 * Generates random test data for automation testing
 */
export class TestDataGenerator {
  private static readonly USERNAME_WORDS = [
    'alpha', 'beta', 'gamma', 'delta', 'omega', 'zeta',
    'sigma', 'theta', 'lambda', 'kappa', 'phi', 'psi'
  ];

  private static readonly DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'test.com'];

  /**
   * Generates a random username with email format
   * @param length - Length of the random string part
   * @returns Random username in email format
   */
  static generateRandomUsername(length: number = 8): string {
    const randomString = this.generateRandomString(length, 'alphanumeric');
    const domain = this.DOMAINS[Math.floor(Math.random() * this.DOMAINS.length)];
    return `${randomString}@${domain}`;
  }

  /**
   * Generates a random password with specified criteria
   * @param length - Length of the password
   * @param includeSpecialChars - Whether to include special characters
   * @returns Random password
   */
  static generateRandomPassword(length: number = 12, includeSpecialChars: boolean = true): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let charset = lowercase + uppercase + numbers;
    if (includeSpecialChars) {
      charset += specialChars;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return password;
  }

  /**
   * Generates random user credentials
   * @returns UserCredentials object with random data
   */
  static generateRandomUserCredentials(): UserCredentials {
    return {
      username: this.generateRandomUsername(),
      password: TEST_DATA_CONSTANTS.DEFAULT_PASSWORD
    };
  }

  /**
   * Generates random user profile data
   * @returns UserProfile object with random data
   */
  static generateRandomUserProfile(): UserProfile {
    const firstName = this.generateRandomString(6, 'alpha');
    const lastName = this.generateRandomString(8, 'alpha');
    
    return {
      firstName: this.capitalizeFirstLetter(firstName),
      lastName: this.capitalizeFirstLetter(lastName),
      address: `${Math.floor(Math.random() * 9999) + 1} ${this.generateRandomString(10, 'alpha')} Street`,
      city: this.capitalizeFirstLetter(this.generateRandomString(8, 'alpha')),
      state: this.generateRandomString(2, 'alpha').toUpperCase(),
      zipCode: this.generateRandomString(5, 'numeric'),
      phoneNumber: this.generateRandomString(10, 'numeric'),
      ssn: this.generateRandomString(3, 'numeric') + '-' + 
           this.generateRandomString(2, 'numeric') + '-' + 
           this.generateRandomString(4, 'numeric')
    };
  }

  /**
   * Generates a random string with specified criteria
   * @param length - Length of the string
   * @param type - Type of characters to use
   * @returns Random string
   */
  private static generateRandomString(length: number, type: 'alpha' | 'numeric' | 'alphanumeric'): string {
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    const numeric = '0123456789';
    
    let charset = '';
    switch (type) {
      case 'alpha':
        charset = alpha;
        break;
      case 'numeric':
        charset = numeric;
        break;
      case 'alphanumeric':
        charset = alpha + numeric;
        break;
    }
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  /**
   * Capitalizes the first letter of a string
   * @param str - String to capitalize
   * @returns Capitalized string
   */
  private static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Gets demo credentials for testing
   * @returns Demo user credentials
   */
  static getDemoCredentials(): UserCredentials {
    return {
      username: TEST_DATA_CONSTANTS.DEMO_CREDENTIALS.USERNAME,
      password: TEST_DATA_CONSTANTS.DEMO_CREDENTIALS.PASSWORD
    };
  }

  /**
   * Gets default test profile
   * @returns Default user profile
   */
  static getDefaultTestProfile(): UserProfile {
    return {
      firstName: TEST_DATA_CONSTANTS.TEST_PROFILE.FIRST_NAME,
      lastName: TEST_DATA_CONSTANTS.TEST_PROFILE.LAST_NAME,
      address: TEST_DATA_CONSTANTS.TEST_PROFILE.ADDRESS,
      city: TEST_DATA_CONSTANTS.TEST_PROFILE.CITY,
      state: TEST_DATA_CONSTANTS.TEST_PROFILE.STATE,
      zipCode: TEST_DATA_CONSTANTS.TEST_PROFILE.ZIP_CODE,
      phoneNumber: TEST_DATA_CONSTANTS.TEST_PROFILE.PHONE_NUMBER,
      ssn: TEST_DATA_CONSTANTS.TEST_PROFILE.SSN
    };
  }
}
