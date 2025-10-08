"""
Type definitions for the ParaBank automation framework.
"""
from typing import TypedDict, List, Optional


class UserCredentials(TypedDict):
    """User credentials type definition."""
    username: str
    password: str


class UserProfile(TypedDict):
    """User profile type definition."""
    firstName: str
    lastName: str
    address: str
    city: str
    state: str
    zipCode: str
    phoneNumber: str
    ssn: str


class AccountInfo(TypedDict):
    """Account information type definition."""
    id: str
    type: str
    balance: float


class TransferInfo(TypedDict):
    """Transfer information type definition."""
    fromAccount: str
    toAccount: str
    amount: float


class BillPaymentInfo(TypedDict):
    """Bill payment information type definition."""
    payeeName: str
    payeeAddress: str
    payeeCity: str
    payeeState: str
    payeeZipCode: str
    payeePhone: str
    fromAccount: str
    amount: float
