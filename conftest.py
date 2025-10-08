"""
Pytest configuration and fixtures for the ParaBank automation framework.
"""
import os
import json
import pytest
from playwright.sync_api import sync_playwright, Browser, BrowserContext, Page
from typing import Generator
from src.config.config import Config
from src.utils.test_data import TestDataGenerator


@pytest.fixture(scope="session")
def config() -> Config:
    """Load configuration settings."""
    return Config()


@pytest.fixture(scope="session")
def browser() -> Generator[Browser, None, None]:
    """Create browser instance for the test session."""
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=Config().headless,
            slow_mo=Config().slow_mo
        )
        yield browser
        browser.close()


@pytest.fixture(scope="function")
def context(browser: Browser) -> Generator[BrowserContext, None, None]:
    """Create browser context for each test."""
    context = browser.new_context(
        viewport={"width": 1920, "height": 1080},
        ignore_https_errors=True
    )
    yield context
    context.close()


@pytest.fixture(scope="function")
def page(context: BrowserContext) -> Generator[Page, None, None]:
    """Create page instance for each test."""
    page = context.new_page()
    page.set_default_timeout(Config().timeout)
    yield page
    page.close()


@pytest.fixture(scope="function")
def test_data() -> TestDataGenerator:
    """Provide test data generator instance."""
    return TestDataGenerator()


@pytest.fixture(scope="function")
def credentials() -> dict:
    """Load test credentials from file."""
    credentials_file = os.path.join(os.path.dirname(__file__), "data", "credentials.json")
    
    if os.path.exists(credentials_file):
        with open(credentials_file, 'r') as f:
            return json.load(f)
    else:
        # Return demo credentials if file doesn't exist
        return {
            "username": "john",
            "password": "demo"
        }


@pytest.fixture(autouse=True)
def setup_test_environment():
    """Setup test environment before each test."""
    # Create reports directory if it doesn't exist
    os.makedirs("reports", exist_ok=True)
    os.makedirs("data", exist_ok=True)
    os.makedirs("screenshots", exist_ok=True)
    
    yield
    
    # Cleanup after test if needed
    pass


def pytest_configure(config):
    """Configure pytest with custom markers."""
    config.addinivalue_line(
        "markers", "smoke: mark test as smoke test"
    )
    config.addinivalue_line(
        "markers", "regression: mark test as regression test"
    )
    config.addinivalue_line(
        "markers", "api: mark test as API test"
    )
    config.addinivalue_line(
        "markers", "ui: mark test as UI test"
    )
    config.addinivalue_line(
        "markers", "slow: mark test as slow running"
    )


def pytest_collection_modifyitems(config, items):
    """Modify test collection to add markers based on test names."""
    for item in items:
        # Add smoke marker to tests with 'smoke' in the name
        if "smoke" in item.nodeid:
            item.add_marker(pytest.mark.smoke)
        
        # Add regression marker to tests with 'regression' in the name
        if "regression" in item.nodeid:
            item.add_marker(pytest.mark.regression)
        
        # Add api marker to tests with 'api' in the name
        if "api" in item.nodeid:
            item.add_marker(pytest.mark.api)
        
        # Add ui marker to tests with 'ui' in the name
        if "ui" in item.nodeid:
            item.add_marker(pytest.mark.ui)