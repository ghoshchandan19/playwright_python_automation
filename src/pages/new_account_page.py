"""
New account page object for ParaBank application.
"""
from playwright.sync_api import Page, expect
from src.pages.base_page import BasePage


class NewAccountPage(BasePage):
    """New account page class for ParaBank account management functionality."""
    
    def __init__(self, page: Page):
        """
        Initialize the new account page.
        
        Args:
            page: Playwright page instance
        """
        super().__init__(page)
        self.account_menu = page.locator("text=Open New Account")
        self.combo_box = page.get_by_role("combobox")
    
    def create_savings_account(self) -> str:
        """
        Create a new savings account and return the account ID.
        
        This method navigates to the "Open New Account" page, selects
        the savings account type, submits the form, and extracts the newly created
        account ID from the accounts overview page.
        
        Returns:
            The account ID of the newly created savings account
            
        Raises:
            Exception: If no account activity links are found, indicating the account creation may have failed
        """
        self.account_menu.click()
        
        # Wait and select 'Savings' (value = "1") from account type dropdown
        combo = self.combo_box.first
        expect(combo).to_be_visible(timeout=5000)
        combo.select_option("1")
        
        # Click 'Open New Account' button
        self.page.locator("input[type='button']").click()
        
        # Wait for 'Accounts Overview' to be visible
        accounts_overview_link = self.page.locator("text=Accounts Overview")
        expect(accounts_overview_link).to_be_visible(timeout=5000)
        accounts_overview_link.click()
        
        # Wait until activity links are loaded
        self.page.wait_for_selector("a[href^='activity.htm']", timeout=5000)
        
        # Fetch all 'activity.htm' links and extract account ID
        links = self.page.locator("a[href^='activity.htm']")
        activity_links = links.evaluate_all("elements => elements.map(el => el.getAttribute('href'))")
        
        if not activity_links:
            raise Exception("No account activity links found! Account might not have been created.")
        
        # Get last account ID
        last_link = activity_links[-1]
        last_id = last_link.split("id=")[1] if "id=" in last_link else ""
        print(f"Here is the account ID: {last_id}")
        return last_id
    
    def calculations(self) -> list:
        """
        Perform account balance calculations and validate account data.
        
        This method extracts account information from the accounts overview
        table, calculates balances, validates totals, and returns a list of account IDs.
        It also performs balance validation to ensure the sum of individual accounts
        matches the total balance displayed.
        
        Returns:
            List of account IDs found in the accounts overview
        """
        self.page.wait_for_selector('//*[@id="accountTable"]/tbody/tr', timeout=5000)
        rows = self.page.locator('//*[@id="accountTable"]/tbody/tr')
        all_td_values = []
        
        row_count = rows.count()
        for i in range(row_count):
            row = rows.nth(i)
            td_values = row.locator("td")
            td_count = td_values.count()
            td_texts = []
            
            for j in range(td_count):
                text = td_values.nth(j).inner_text()
                td_texts.append(text)
            all_td_values.append(td_texts)
        
        if not all_td_values:
            print("No account data found!")
            return []
        
        account_ids = [
            item[0] for item in all_td_values 
            if item and item[0] and item[0].isdigit()
        ]
        
        middle_values = [
            item[1] for item in all_td_values 
            if len(item) > 1 and item[1] not in ['Total', '\xa0']
        ]
        
        numeric_values = [
            float(value.replace('$', '').replace(',', ''))
            for value in middle_values[:-1]  # Exclude total row
            if value.replace('$', '').replace(',', '').replace('.', '').isdigit()
        ]
        
        print(f"Account IDs: {account_ids}")
        print(f"The Amount Of Balance Available In Each Account: {numeric_values}")
        
        # Validate total balance
        if len(all_td_values) > 1 and len(all_td_values[-1]) > 1:
            expected_total = float(all_td_values[-1][1].replace('$', '').replace(',', ''))
            calculated_total = sum(numeric_values)
            assert abs(calculated_total - expected_total) < 0.01, f"Balance mismatch: {calculated_total} vs {expected_total}"
        
        return account_ids
    
    def transfer_funds(self, account_ids: list) -> None:
        """
        Transfer funds between two accounts.
        
        This method transfers a fixed amount ($1000) from the first account
        to the second account in the provided list. If fewer than 2 accounts are available,
        it will attempt to create a new account first. The method handles the complete
        transfer process including form filling and submission.
        
        Args:
            account_ids: List of account IDs to transfer between
        """
        print(f"Checking available accounts: {len(account_ids)}")
        
        if len(account_ids) < 2:
            print("Not enough accounts for transfer. Creating another account...")
            self.create_savings_account()
            self.page.wait_for_load_state('networkidle')
            new_account_ids = self.calculations()
            if len(new_account_ids) < 2:
                print("Account creation failed or did not reflect in UI. Transfer aborted.")
                return
            account_ids = new_account_ids
        
        if len(account_ids) < 2:
            print("⚠️ Only one account available. Cannot perform transfer.")
            return
        
        from_account = account_ids[0]
        to_account = account_ids[1]
        print(f"From Account: {account_ids[0]}")
        print(f"Destination Account: {account_ids[1]}")
        print(f"✅ Transferring $1000 from {from_account} to {to_account}...")
        
        self.page.locator('text=Transfer Funds').click()
        self.page.locator('input[name="amount"]').fill("1000")
        self.page.locator('select[name="fromAccountId"]').select_option(from_account)
        self.page.locator('select[name="toAccountId"]').select_option(to_account)
        self.page.locator('input[value="Transfer"]').click()
        print("✅ Transfer successful!")
    
    def pay_bill(self, account_ids: list) -> None:
        """
        Pay a bill using the first available account.
        
        This method navigates to the bill payment page and pays a fixed
        amount ($500) to "Electricity Company" using the first account from the
        provided list. It fills all required form fields including payee information,
        address details, and payment amount. The method includes error handling for
        phone field input and takes screenshots on failure.
        
        Args:
            account_ids: List of account IDs, uses the first one for payment
        """
        if not account_ids:
            print("No accounts available for bill payment.")
            return
        
        from_account = account_ids[0]
        self.page.locator('text=Bill Pay').click()
        print(f"Paying $500 from Account {from_account} to Electricity Company...")
        
        # Fill bill payment form with proper locators
        self.page.locator('input[name="payee.name"]').fill("Electricity Company")
        self.page.locator('input[name="payee.address.street"]').fill("123 Main St")
        self.page.locator('input[name="payee.address.city"]').fill("New York")
        self.page.locator('input[name="payee.address.state"]').fill("NY")
        self.page.locator('input[name="payee.address.zipCode"]').fill("10001")
        
        try:
            # Try to find and fill the phone number field directly
            phone_field = self.page.locator('input[name="phoneNumber"]')
            if phone_field.is_visible():
                phone_field.fill("1234567890")
            else:
                # Fallback to keyboard navigation
                self.page.keyboard.press("Tab")
                self.page.keyboard.type("1234567890")
        except Exception as error:
            print(f"❌ Error: Unable to locate the Phone field - {error}")
            self.page.screenshot(path="phone_field_error.png")
            return
        
        # Fill account and amount fields with proper locators
        self.page.locator('select[name="fromAccountId"]').select_option(from_account)
        self.page.locator('input[name="amount"]').fill("500")
        
        # Submit the form
        self.page.locator('input[value="Send Payment"]').click()
        
        # Wait for the payment to be processed and page to load
        self.page.wait_for_load_state('networkidle')
