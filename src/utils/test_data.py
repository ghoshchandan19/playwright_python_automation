"""
Test data generator utilities for the ParaBank automation framework.
"""
import random
import string
from typing import Dict, Any
from src.types import UserCredentials, UserProfile
from src.constants.application_constants import TEST_DATA_CONSTANTS


class TestDataGenerator:
    """Test data generator class for creating random test data."""
    
    USERNAME_WORDS = [
        'alpha', 'beta', 'gamma', 'delta', 'omega', 'zeta',
        'sigma', 'theta', 'lambda', 'kappa', 'phi', 'psi'
    ]
    
    DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'test.com']
    
    @staticmethod
    def generate_random_username(length: int = 8) -> str:
        """
        Generate a random username with email format.
        
        Args:
            length: Length of the random string part
            
        Returns:
            Random username in email format
        """
        random_string = TestDataGenerator._generate_random_string(length, 'alphanumeric')
        domain = random.choice(TestDataGenerator.DOMAINS)
        return f"{random_string}@{domain}"
    
    @staticmethod
    def generate_random_password(length: int = 12, include_special_chars: bool = True) -> str:
        """
        Generate a random password with specified criteria.
        
        Args:
            length: Length of the password
            include_special_chars: Whether to include special characters
            
        Returns:
            Random password
        """
        lowercase = string.ascii_lowercase
        uppercase = string.ascii_uppercase
        numbers = string.digits
        special_chars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
        
        charset = lowercase + uppercase + numbers
        if include_special_chars:
            charset += special_chars
        
        password = ''.join(random.choice(charset) for _ in range(length))
        return password
    
    @staticmethod
    def generate_random_user_credentials() -> UserCredentials:
        """
        Generate random user credentials.
        
        Returns:
            UserCredentials object with random data
        """
        return {
            'username': TestDataGenerator.generate_random_username(),
            'password': TEST_DATA_CONSTANTS['DEFAULT_PASSWORD']
        }
    
    @staticmethod
    def generate_random_user_profile() -> UserProfile:
        """
        Generate random user profile data.
        
        Returns:
            UserProfile object with random data
        """
        first_name = TestDataGenerator._generate_random_string(6, 'alpha')
        last_name = TestDataGenerator._generate_random_string(8, 'alpha')
        
        return {
            'firstName': TestDataGenerator._capitalize_first_letter(first_name),
            'lastName': TestDataGenerator._capitalize_first_letter(last_name),
            'address': f"{random.randint(1, 9999)} {TestDataGenerator._generate_random_string(10, 'alpha')} Street",
            'city': TestDataGenerator._capitalize_first_letter(TestDataGenerator._generate_random_string(8, 'alpha')),
            'state': TestDataGenerator._generate_random_string(2, 'alpha').upper(),
            'zipCode': TestDataGenerator._generate_random_string(5, 'numeric'),
            'phoneNumber': TestDataGenerator._generate_random_string(10, 'numeric'),
            'ssn': f"{TestDataGenerator._generate_random_string(3, 'numeric')}-"
                   f"{TestDataGenerator._generate_random_string(2, 'numeric')}-"
                   f"{TestDataGenerator._generate_random_string(4, 'numeric')}"
        }
    
    @staticmethod
    def _generate_random_string(length: int, char_type: str) -> str:
        """
        Generate a random string with specified criteria.
        
        Args:
            length: Length of the string
            char_type: Type of characters to use ('alpha', 'numeric', 'alphanumeric')
            
        Returns:
            Random string
        """
        if char_type == 'alpha':
            charset = string.ascii_lowercase
        elif char_type == 'numeric':
            charset = string.digits
        elif char_type == 'alphanumeric':
            charset = string.ascii_lowercase + string.digits
        else:
            charset = string.ascii_lowercase
        
        return ''.join(random.choice(charset) for _ in range(length))
    
    @staticmethod
    def _capitalize_first_letter(text: str) -> str:
        """
        Capitalize the first letter of a string.
        
        Args:
            text: String to capitalize
            
        Returns:
            Capitalized string
        """
        return text[0].upper() + text[1:] if text else text
    
    @staticmethod
    def get_demo_credentials() -> UserCredentials:
        """
        Get demo credentials for testing.
        
        Returns:
            Demo user credentials
        """
        return TEST_DATA_CONSTANTS['DEMO_CREDENTIALS']
    
    @staticmethod
    def get_default_test_profile() -> UserProfile:
        """
        Get default test profile.
        
        Returns:
            Default user profile
        """
        profile = TEST_DATA_CONSTANTS['TEST_PROFILE']
        return {
            'firstName': profile['FIRST_NAME'],
            'lastName': profile['LAST_NAME'],
            'address': profile['ADDRESS'],
            'city': profile['CITY'],
            'state': profile['STATE'],
            'zipCode': profile['ZIP_CODE'],
            'phoneNumber': profile['PHONE_NUMBER'],
            'ssn': profile['SSN']
        }
