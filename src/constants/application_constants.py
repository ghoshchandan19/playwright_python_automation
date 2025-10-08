"""
Application constants for ParaBank automation framework.
"""
import os
import json
from typing import Dict, Any


def load_demo_credentials() -> Dict[str, str]:
    """
    Load demo credentials from credentials.json file.
    
    Returns:
        Dict containing username and password from credentials.json
    """
    try:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        data_dir = os.path.join(base_dir, "data")
        file_path = os.path.join(data_dir, "credentials.json")
        
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                credentials = json.load(f)
                
            # Ensure we have valid strings
            if credentials.get('username') and credentials.get('password'):
                return {
                    'username': str(credentials['username']),
                    'password': str(credentials['password'])
                }
    except Exception as error:
        print(f'Could not load credentials from file, using defaults: {error}')
    
    # Always return valid fallback credentials
    return {
        'username': 'john',
        'password': 'demo'
    }


# Application configuration
APPLICATION_CONFIG = {
    'NAME': 'ParaBank',
    'VERSION': '1.0.0',
    'TIMEOUTS': {
        'DEFAULT': 30000,
        'SHORT': 5000,
        'LONG': 60000,
        'NETWORK_IDLE': 1000
    },
    'RETRY_ATTEMPTS': 3,
    'SCREENSHOT_QUALITY': 80
}

# Test data constants
TEST_DATA_CONSTANTS = {
    'DEFAULT_PASSWORD': 'Password123',
    'DEMO_CREDENTIALS': load_demo_credentials(),
    'TEST_PROFILE': {
        'FIRST_NAME': 'John',
        'LAST_NAME': 'Smith',
        'ADDRESS': '123 Main Street',
        'CITY': 'Anytown',
        'STATE': 'CA',
        'ZIP_CODE': '12345',
        'PHONE_NUMBER': '5551234567',
        'SSN': '123-45-6789'
    },
    'AMOUNTS': {
        'SMALL': 100,
        'MEDIUM': 500,
        'LARGE': 1000
    }
}

# Page element selectors
SELECTORS = {
    'LOGIN': {
        'USERNAME_FIELD': '//*[@id="loginPanel"]/form/div[1]/input',
        'PASSWORD_FIELD': '//*[@id="loginPanel"]/form/div[2]/input',
        'LOGIN_BUTTON': '//*[@id="loginPanel"]/form/div[3]/input'
    },
    'REGISTRATION': {
        'FIRST_NAME': "input[name='customer.firstName']",
        'LAST_NAME': "input[name='customer.lastName']",
        'ADDRESS': "input[name='customer.address.street']",
        'CITY': "input[name='customer.address.city']",
        'STATE': "input[name='customer.address.state']",
        'ZIP_CODE': "input[name='customer.address.zipCode']",
        'PHONE': "input[name='customer.phoneNumber']",
        'SSN': "input[name='customer.ssn']",
        'USERNAME': "input[name='customer.username']",
        'PASSWORD': "input[name='customer.password']",
        'CONFIRM_PASSWORD': "input[name='repeatedPassword']",
        'REGISTER_BUTTON': '//*[@id="customerForm"]/table/tbody/tr[13]/td[2]/input',
        'LOGOUT_LINK': '//*[@id="leftPanel"]/ul/li[8]/a'
    },
    'NAVIGATION': {
        'HOME_MENU': '//*[@id="headerPanel"]/ul[2]/li[1]/a',
        'EMPLOYEE_MENU': '//*[@id="headerPanel"]/ul[2]/li[2]/a',
        'CUSTOMER_MENU': '//*[@id="headerPanel"]/ul[2]/li[3]/a'
    },
    'ACCOUNT': {
        'NEW_ACCOUNT_MENU': "text=Open New Account",
        'ACCOUNT_TYPE_DROPDOWN': "select[name='type']",
        'OPEN_ACCOUNT_BUTTON': "input[type='button']",
        'ACCOUNTS_OVERVIEW_LINK': "text=Accounts Overview"
    },
    'TRANSFER': {
        'TRANSFER_MENU': '//*[@id="leftPanel"]/ul/li[3]/a',
        'AMOUNT_FIELD': '//*[@id="amount"]',
        'FROM_ACCOUNT': '//*[@id="fromAccountId"]',
        'TO_ACCOUNT': '//*[@id="toAccountId"]',
        'TRANSFER_BUTTON': '//*[@id="transferForm"]/div[2]/input'
    },
    'BILL_PAY': {
        'BILL_PAY_MENU': '//*[@id="leftPanel"]/ul/li[4]/a',
        'PAYEE_NAME': 'input[name="payee.name"]',
        'PAYEE_ADDRESS': 'input[name="payee.address.street"]',
        'PAYEE_CITY': 'input[name="payee.address.city"]',
        'PAYEE_STATE': 'input[name="payee.address.state"]',
        'PAYEE_ZIP': 'input[name="payee.address.zipCode"]',
        'PAYEE_PHONE': 'input[name="phoneNumber"]',
        'FROM_ACCOUNT': 'select[name="fromAccountId"]',
        'AMOUNT': 'input[name="amount"]',
        'SEND_PAYMENT_BUTTON': 'input[value="Send Payment"]'
    }
}

# Page titles
PAGE_TITLES = {
    'HOME': 'ParaBank | Welcome | Online Banking',
    'LOGIN': 'ParaBank | Welcome | Online Banking',
    'REGISTRATION': 'ParaBank | Customer Created',
    'ACCOUNTS_OVERVIEW': 'ParaBank | Accounts Overview',
    'ABOUT_US': 'ParaBank | About Us',
    'CUSTOMER_CARE': 'ParaBank | Customer Care'
}

# Success messages
SUCCESS_MESSAGES = {
    'REGISTRATION_SUCCESS': 'Your account was created successfully.',
    'TRANSFER_SUCCESS': 'Transfer Complete!',
    'PAYMENT_SUCCESS': 'Bill Payment Complete'
}
