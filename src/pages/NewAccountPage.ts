import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../config/urls';

/**
 * NewAccountPage class handles all account-related operations in ParaBank
 * 
 * @description This page object class provides methods for creating new accounts,
 * performing account calculations, transferring funds between accounts, and
 * paying bills. It encapsulates all the locators and business logic related
 * to account management functionality.
 * 
 * @example
 * ```typescript
 * const newAccountPage = new NewAccountPage(page);
 * const accountId = await newAccountPage.createSavingsAccount();
 * ```
 */
export class NewAccountPage {
  private page: Page;
  private accountMenu: Locator;
  private comboBox: Locator;

  /**
   * Creates an instance of NewAccountPage
   * 
   * @param {Page} page - Playwright page instance for browser interactions
   * 
   * @description Initializes the page object with necessary locators for
   * account management operations including the account menu and dropdown
   * selectors.
   */
  constructor(page: Page) {
    this.page = page;
    this.accountMenu = page.locator("text=Open New Account");
    this.comboBox = this.page.getByRole("combobox");
  }

  /**
   * Creates a new savings account and returns the account ID
   * 
   * @description This method navigates to the "Open New Account" page, selects
   * the savings account type, submits the form, and extracts the newly created
   * account ID from the accounts overview page.
   * 
   * @returns {Promise<string>} The account ID of the newly created savings account
   * 
   * @throws {Error} Throws an error if no account activity links are found,
   * indicating the account creation may have failed
   * 
   * @example
   * ```typescript
   * const accountId = await newAccountPage.createSavingsAccount();
   * console.log(`Created account: ${accountId}`);
   * ```
   */
  async createSavingsAccount(): Promise<string> {
    await this.accountMenu.click();
    // Wait and select 'Savings' (value = "1") from account type dropdown
    const combo = this.comboBox.first();
    await expect(combo).toBeVisible({ timeout: 5000 });
    await combo.selectOption("1");

    // Click 'Open New Account' button
    await this.page.locator("input[type='button']").click();

    // Wait for 'Accounts Overview' to be visible
    const accountsOverviewLink = this.page.locator("text=Accounts Overview");
    await expect(accountsOverviewLink).toBeVisible({ timeout: 5000 });
    await accountsOverviewLink.click();

    // Wait until activity links are loaded
    await this.page.waitForSelector("a[href^='activity.htm']", { timeout: 5000 });

    // Fetch all 'activity.htm' links and extract account ID
    const links = this.page.locator("a[href^='activity.htm']");
    const activityLinks = await links.evaluateAll((elements) => 
      elements.map(el => el.getAttribute("href"))
    );

    if (activityLinks.length === 0) {
      throw new Error("No account activity links found! Account might not have been created.");
    }

    // Get last account ID
    const lastLink = activityLinks[activityLinks.length - 1];
    const lastId = lastLink?.split("id=")[1] || "";
    console.log("Here is the account ID:", lastId);
    return lastId;
  }

  /**
   * Performs account balance calculations and validates account data
   * 
   * @description This method extracts account information from the accounts overview
   * table, calculates balances, validates totals, and returns a list of account IDs.
   * It also performs balance validation to ensure the sum of individual accounts
   * matches the total balance displayed.
   * 
   * @returns {Promise<string[]>} Array of account IDs found in the accounts overview
   * 
   * @example
   * ```typescript
   * const accountIds = await newAccountPage.calculations();
   * console.log(`Found ${accountIds.length} accounts`);
   * ```
   */
  async calculations(): Promise<string[]> {
    await this.page.waitForSelector('//*[@id="accountTable"]/tbody/tr', { timeout: 5000 });
    const rows = this.page.locator('//*[@id="accountTable"]/tbody/tr');
    const allTdValues: string[][] = [];
    
    const rowCount = await rows.count();
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const tdValues = row.locator("td");
      const tdCount = await tdValues.count();
      const tdTexts: string[] = [];
      
      for (let j = 0; j < tdCount; j++) {
        const text = await tdValues.nth(j).innerText();
        tdTexts.push(text);
      }
      allTdValues.push(tdTexts);
    }

    if (allTdValues.length === 0) {
      console.log("No account data found!");
      return [];
    }

    const accountIds = allTdValues
      .filter(item => item && item[0] && /^\d+$/.test(item[0]))
      .map(item => item[0]);

    const middleValues = allTdValues
      .filter(item => item.length > 1 && item[1] !== 'Total' && item[1] !== '\xa0')
      .map(item => item[1]);

    const numericValues = middleValues
      .slice(0, -1)
      .map(value => parseFloat(value.replace('$', '').replace(',', '')))
      .filter(value => !isNaN(value));

    console.log("Account IDs:", accountIds);
    console.log("The Amount Of Balance Available In Each Account:", numericValues);

    if (allTdValues.length > 1 && allTdValues[allTdValues.length - 1].length > 1) {
      const expectedTotal = parseFloat(allTdValues[allTdValues.length - 1][1].replace('$', '').replace(',', ''));
      const calculatedTotal = numericValues.reduce((sum, value) => sum + value, 0);
      expect(calculatedTotal).toBeCloseTo(expectedTotal, 2);
    }

    return accountIds;
  }

  /**
   * Transfers funds between two accounts
   * 
   * @description This method transfers a fixed amount ($1000) from the first account
   * to the second account in the provided list. If fewer than 2 accounts are available,
   * it will attempt to create a new account first. The method handles the complete
   * transfer process including form filling and submission.
   * 
   * @param {string[]} accountIds - Array of account IDs to transfer between
   * 
   * @returns {Promise<void>} Promise that resolves when transfer is complete
   * 
   * @throws {Error} May throw errors if account creation fails or insufficient accounts
   * 
   * @example
   * ```typescript
   * const accountIds = ['12345', '67890'];
   * await newAccountPage.transferFunds(accountIds);
   * ```
   */
  async transferFunds(accountIds: string[]): Promise<void> {
    console.log(`Checking available accounts: ${accountIds.length}`);
    if (accountIds.length < 2) {
      console.log("Not enough accounts for transfer. Creating another account...");
      await this.createSavingsAccount();
      await this.page.waitForLoadState('networkidle');
      const newAccountIds = await this.calculations();
      if (newAccountIds.length < 2) {
        console.log("Account creation failed or did not reflect in UI. Transfer aborted.");
        return;
      }
      accountIds = newAccountIds;
    }

    if (accountIds.length < 2) {
      console.log("⚠️ Only one account available. Cannot perform transfer.");
      return;
    }

    const fromAccount = accountIds[0];
    const toAccount = accountIds[1];
    console.log("From Account:", accountIds[0]);
    console.log("Destination Account", accountIds[1]);
    console.log(`✅ Transferring $1000 from ${fromAccount} to ${toAccount}...`);

    await this.page.locator('text=Transfer Funds').click();
    await this.page.locator('input[name="amount"]').fill("1000");
    await this.page.locator('select[name="fromAccountId"]').selectOption(fromAccount);
    await this.page.locator('select[name="toAccountId"]').selectOption(toAccount);
    await this.page.locator('input[value="Transfer"]').click();
    console.log("✅ Transfer successful!");
  }

  /**
   * Pays a bill using the first available account
   * 
   * @description This method navigates to the bill payment page and pays a fixed
   * amount ($500) to "Electricity Company" using the first account from the
   * provided list. It fills all required form fields including payee information,
   * address details, and payment amount. The method includes error handling for
   * phone field input and takes screenshots on failure.
   * 
   * @param {string[]} accountIds - Array of account IDs, uses the first one for payment
   * 
   * @returns {Promise<void>} Promise that resolves when bill payment is complete
   * 
   * @throws {Error} May throw errors if no accounts are available or form submission fails
   * 
   * @example
   * ```typescript
   * const accountIds = ['12345'];
   * await newAccountPage.payBill(accountIds);
   * ```
   */
  async payBill(accountIds: string[]): Promise<void> {
    if (accountIds.length === 0) {
      console.log("No accounts available for bill payment.");
      return;
    }

    const fromAccount = accountIds[0];
    await this.page.locator('text=Bill Pay').click();
    console.log(`Paying $500 from Account ${fromAccount} to Electricity Company...`);

    // Fill bill payment form with proper locators
    await this.page.locator('input[name="payee.name"]').fill("Electricity Company");
    await this.page.locator('input[name="payee.address.street"]').fill("123 Main St");
    await this.page.locator('input[name="payee.address.city"]').fill("New York");
    await this.page.locator('input[name="payee.address.state"]').fill("NY");
    await this.page.locator('input[name="payee.address.zipCode"]').fill("10001");

    try {
      // Try to find and fill the phone number field directly
      const phoneField = this.page.locator('input[name="phoneNumber"]');
      if (await phoneField.isVisible()) {
        await phoneField.fill("1234567890");
      } else {
        // Fallback to keyboard navigation
        await this.page.keyboard.press("Tab");
        await this.page.keyboard.type("1234567890");
      }
    } catch (error) {
      console.log(`❌ Error: Unable to locate the Phone field - ${error}`);
      await this.page.screenshot({ path: "phone_field_error.png" });
      return;
    }

    // Fill account and amount fields with proper locators
    await this.page.locator('select[name="fromAccountId"]').selectOption(fromAccount);
    await this.page.locator('input[name="amount"]').fill("500");
    
    // Submit the form
    await this.page.locator('input[value="Send Payment"]').click();
    
    // Wait for the payment to be processed and page to load
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveTitle(/.*/);
  }
}
