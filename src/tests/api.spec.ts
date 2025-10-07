import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { API_URLS } from '../config/urls';

/**
 * Credentials interface for user authentication
 * 
 * @description Defines the structure for user credentials used in API tests
 */
interface Credentials {
  username: string;
  password: string;
}

const baseDir = path.dirname(path.dirname(__dirname));
const filePath = path.join(baseDir, "data", "credentials.json");

if (!fs.existsSync(filePath)) {
  throw new Error(`Error: ${filePath} not found.`);
}

const credentials: Credentials = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const USERNAME = credentials.username;
const PASSWORD = credentials.password;

// API Endpoints - now using centralized config
const BASE_URL = API_URLS.BASE_URL;
const LOGIN_URL = API_URLS.LOGIN_URL;

/**
 * ParaBank API Test Suite
 * 
 * @description This test suite contains API tests that validate backend
 * functionality including authentication, session management, and account
 * data retrieval through REST API endpoints.
 */
test.describe('API Tests', () => {
  let sessionId: string;

  /**
   * Setup method that runs before all tests
   * 
   * @description This method performs initial authentication and extracts
   * the JSESSIONID cookie for use in subsequent API calls. It validates
   * the login response and ensures proper session management.
   * 
   * @param {Object} request - Playwright request context
   */
  test.beforeAll(async ({ request }) => {
    // Logs in and returns a valid JSESSIONID for reuse
    const payload = { username: USERNAME, password: PASSWORD };
    const response = await request.post(LOGIN_URL, { data: payload });
    expect(response.status()).toBe(200);
    
    const cookies = response.headers()['set-cookie'];
    if (cookies) {
      const jsessionMatch = cookies.match(/JSESSIONID=([^;]+)/);
      if (jsessionMatch) {
        sessionId = jsessionMatch[1];
        console.log(`✅ Login successful! JSESSIONID: ${sessionId}`);
      } else {
        throw new Error("JSESSIONID not found in cookies");
      }
    } else {
      throw new Error("No cookies found");
    }
  });

  /**
   * Login verification test
   * 
   * @description This test verifies that the login process was successful
   * by checking that a valid session ID was obtained during the beforeAll
   * setup phase.
   */
  test('Login test', async () => {
    expect(sessionId).toBeTruthy();
  });

  /**
   * Get accounts API test
   * 
   * @description This test validates the accounts API endpoint by making
   * an authenticated request to retrieve user account information. It verifies
   * the response structure, data types, and account ID format.
   * 
   * @param {Object} request - Playwright request context
   */
  test('Get accounts', async ({ request }) => {
    const headers = {
      "Accept": "application/json",
      "Cookie": `JSESSIONID=${sessionId}`,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    };
    
    const response = await request.get(API_URLS.ACCOUNTS_API, { headers });
    expect(response.status()).toBe(200);
    
    const accounts = await response.json();
    expect(Array.isArray(accounts)).toBeTruthy();
    
    const accountIds = accounts.map((account: any) => account.id);
    expect(accountIds.length).toBeGreaterThan(0);
    expect(accountIds.every((id: any) => typeof id === 'number')).toBeTruthy();
    
    console.log("✅ Account IDs:", accountIds);
  });
});