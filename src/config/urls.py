"""
URL configuration for ParaBank application.
"""
from typing import Dict


class URLs:
    """URL configuration class for ParaBank application."""
    
    BASE_URL = 'https://parabank.parasoft.com'
    HOME = 'https://parabank.parasoft.com/'
    REGISTRATION = 'https://parabank.parasoft.com/parabank/register.htm'
    LOGIN = 'https://parabank.parasoft.com/parabank/index.htm'
    ACCOUNTS_OVERVIEW = 'https://parabank.parasoft.com/parabank/overview.htm'
    NEW_ACCOUNT = 'https://parabank.parasoft.com/parabank/openaccount.htm'
    TRANSFER_FUNDS = 'https://parabank.parasoft.com/parabank/transfer.htm'
    BILL_PAY = 'https://parabank.parasoft.com/parabank/billpay.htm'
    ABOUT_US = 'https://parabank.parasoft.com/parabank/about.htm'
    CUSTOMER_CARE = 'https://parabank.parasoft.com/parabank/contact.htm'


class APIURLs:
    """API URL configuration class for ParaBank API endpoints."""
    
    BASE_URL = 'https://parabank.parasoft.com/parabank'
    LOGIN_URL = 'https://parabank.parasoft.com/parabank/index.htm'
    ACCOUNTS_API = 'https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts'


# URL dictionaries for easy access
URLS = {
    'BASE_URL': URLs.BASE_URL,
    'HOME': URLs.HOME,
    'REGISTRATION': URLs.REGISTRATION,
    'LOGIN': URLs.LOGIN,
    'ACCOUNTS_OVERVIEW': URLs.ACCOUNTS_OVERVIEW,
    'NEW_ACCOUNT': URLs.NEW_ACCOUNT,
    'TRANSFER_FUNDS': URLs.TRANSFER_FUNDS,
    'BILL_PAY': URLs.BILL_PAY,
    'ABOUT_US': URLs.ABOUT_US,
    'CUSTOMER_CARE': URLs.CUSTOMER_CARE
}

API_URLS = {
    'BASE_URL': APIURLs.BASE_URL,
    'LOGIN_URL': APIURLs.LOGIN_URL,
    'ACCOUNTS_API': APIURLs.ACCOUNTS_API
}
