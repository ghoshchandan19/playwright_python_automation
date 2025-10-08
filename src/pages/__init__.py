"""
Page objects for the ParaBank automation framework.
"""
from .base_page import BasePage
from .home_page import HomePage
from .login_page import LoginPage
from .registration_page import RegistrationPage
from .new_account_page import NewAccountPage

__all__ = [
    'BasePage',
    'HomePage', 
    'LoginPage',
    'RegistrationPage',
    'NewAccountPage'
]
