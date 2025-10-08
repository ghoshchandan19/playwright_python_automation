# ParaBank Python Automation Framework

A comprehensive Python-based automation testing framework for the ParaBank application using Playwright and pytest.

## Features

- **Python & Pytest**: Modern Python testing with pytest framework
- **Page Object Model**: Clean, maintainable page object pattern implementation
- **Playwright Integration**: Full Playwright support for browser automation
- **Cross-browser Testing**: Support for Chromium, Firefox, and WebKit
- **API Testing**: REST API testing capabilities with requests
- **Parallel Execution**: Multi-threaded test execution with pytest-xdist
- **Rich Reporting**: HTML, Allure, and coverage reports
- **Screenshots**: Automatic capture on test failures
- **CI/CD Ready**: GitHub Actions and Jenkins integration

## Project Structure

```
playwright_python_automation/
├── src/
│   ├── config/                 # Configuration files
│   │   ├── __init__.py
│   │   ├── config.py          # Main configuration
│   │   └── urls.py            # URL constants
│   ├── constants/             # Application constants
│   │   ├── __init__.py
│   │   └── application_constants.py
│   ├── helpers/               # Test helpers and fixtures
│   │   ├── __init__.py
│   │   └── test_fixtures.py
│   ├── pages/                 # Page Object Model classes
│   │   ├── __init__.py
│   │   ├── base_page.py       # Base page class
│   │   ├── home_page.py       # Home page
│   │   ├── login_page.py      # Login page
│   │   ├── registration_page.py # Registration page
│   │   └── new_account_page.py  # Account management page
│   ├── tests/                 # Test files
│   │   ├── test_end_to_end.py # E2E tests
│   │   └── test_api.py        # API tests
│   ├── types/                 # Type definitions
│   │   └── __init__.py
│   └── utils/                 # Utility functions
│       ├── __init__.py
│       └── test_data.py       # Test data generator
├── data/                      # Test data files
├── reports/                   # Test reports
├── screenshots/               # Screenshots
├── conftest.py               # Pytest configuration
├── pytest.ini               # Pytest settings
├── requirements.txt          # Python dependencies
└── run_tests.py             # Test runner script
```

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright_python_automation
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install Playwright browsers**
   ```bash
   playwright install
   ```

## Configuration

The framework is configured via environment variables and configuration files:

### Environment Variables

Create a `.env` file in the project root:

```env
# Browser settings
HEADLESS=true
SLOW_MO=0
BROWSER=chromium
VIEWPORT_WIDTH=1920
VIEWPORT_HEIGHT=1080

# Timeout settings
TIMEOUT=30000
DEFAULT_TIMEOUT=30000
SHORT_TIMEOUT=5000
LONG_TIMEOUT=60000

# Test settings
RETRY_ATTEMPTS=3
SCREENSHOT_QUALITY=80

# Application URL
BASE_URL=https://parabank.parasoft.com
```

### Configuration Features

- **Base URL**: https://parabank.parasoft.com
- **Parallel Execution**: Enabled with pytest-xdist
- **Retry Logic**: Configurable retry attempts
- **Screenshots**: Captured on test failures
- **Multiple Browsers**: Chromium, Firefox, WebKit
- **Test Markers**: Smoke, regression, API, UI test categorization

## Running Tests

### Basic Test Execution

```bash
# Run all tests
pytest

# Run tests with verbose output
pytest -v

# Run specific test file
pytest src/tests/test_end_to_end.py

# Run specific test method
pytest src/tests/test_end_to_end.py::TestParaBankEndToEnd::test_login_with_existing_credentials
```

### Test Markers

```bash
# Run smoke tests only
pytest -m smoke

# Run regression tests only
pytest -m regression

# Run API tests only
pytest -m api

# Run UI tests only
pytest -m ui

# Run multiple markers
pytest -m "smoke and ui"
```

### Parallel Execution

```bash
# Run tests in parallel (4 workers)
pytest -n 4

# Run tests in parallel with auto-detection
pytest -n auto
```

### Browser Options

```bash
# Run tests in headed mode (visible browser)
HEADLESS=false pytest

# Run tests with slow motion
SLOW_MO=1000 pytest

# Run tests in specific browser
BROWSER=firefox pytest
```

### Test Reports

```bash
# Generate HTML report
pytest --html=reports/report.html --self-contained-html

# Generate coverage report
pytest --cov=src --cov-report=html:reports/coverage

# Generate Allure report
pytest --alluredir=reports/allure-results
allure serve reports/allure-results
```

### Custom Test Runner

```bash
# Use the custom test runner script
python run_tests.py --smoke --report
python run_tests.py --regression --parallel 4
python run_tests.py --api --coverage
```

## CI/CD Pipeline

This project includes a GitHub Actions workflow for automated testing:

### GitHub Actions Configuration

The CI pipeline (`/.github/workflows/github.yml`) runs on:
- **Triggers**: Push to `main`/`develop` branches and pull requests to `main`
- **Environment**: Ubuntu latest
- **Python**: Version 3.9
- **Browser**: Chromium only (for faster CI execution)
- **Test Framework**: pytest with Playwright

### Pipeline Steps

1. **Checkout code** - Downloads the repository
2. **Setup Python** - Installs Python 3.9
3. **Install dependencies** - Runs `pip install -r requirements.txt`
4. **Install Playwright browsers** - Installs Chromium with dependencies
5. **Run tests** - Executes tests with pytest
6. **Upload test results** - Saves test reports as artifacts (30-day retention)

### Viewing CI Results

- Test reports are automatically uploaded as artifacts
- Download the `reports` artifact to view detailed test results
- Check the Actions tab in GitHub for pipeline status

## Test Examples

### Page Object Model Usage

```python
import pytest
from playwright.sync_api import Page, expect
from src.pages.login_page import LoginPage

def test_user_login(page: Page):
    login_page = LoginPage(page)
    login_page.login('username', 'password')
    expect(page).to_have_title('ParaBank | Accounts Overview')
```

### API Testing

```python
import pytest
from playwright.sync_api import APIRequestContext, expect

def test_api_authentication(request_context: APIRequestContext):
    response = request_context.post('/api/login', data={
        'username': 'user', 
        'password': 'pass'
    })
    expect(response).to_be_ok()
```

## Page Objects

### BasePage
- Base class for all page objects
- Common functionality: navigation, element interaction, screenshots

### LoginPage
- Handles user authentication
- Methods: `login(username, password)`, `is_login_form_visible()`

### RegistrationPage
- Manages user registration
- Methods: `register_user()`, `_generate_random_username()`

### HomePage
- Navigation and menu verification
- Methods: `verify_homescreen_menu()`, `verify_emp_screen()`, `verify_customer_screen()`

### NewAccountPage
- Account management operations
- Methods: `create_savings_account()`, `transfer_funds()`, `pay_bill()`, `calculations()`

## Utilities

### Test Data Management
- **Dynamic Credentials**: Automatically loads credentials from `data/credentials.json`
- **Random Username Generation**: Creates unique usernames for each test run
- **Centralized Constants**: All selectors, URLs, and test data in `application_constants.py`
- **Fallback Credentials**: Uses default credentials if JSON file doesn't exist

### Configuration Files
- **`application_constants.py`**: Centralized configuration, selectors, and test data
- **`urls.py`**: Application URLs and endpoints
- **`config.py`**: Main configuration with environment variable support
- **`pytest.ini`**: Pytest configuration and test discovery settings

## Best Practices

1. **Use Python Type Hints**: Leverage type annotations for better code quality
2. **Page Object Model**: Keep page interactions in dedicated classes
3. **Pytest Fixtures**: Use fixtures for setup and teardown operations
4. **Test Markers**: Organize tests with appropriate markers (smoke, regression, api, ui)
5. **Descriptive Test Names**: Write clear, descriptive test names
6. **Wait Strategies**: Use proper wait conditions instead of hard sleeps
7. **Error Handling**: Implement proper error handling and assertions
8. **Environment Variables**: Make tests configurable with environment variables

## Troubleshooting

### Common Issues

1. **Browser Installation**
   ```bash
   playwright install
   ```

2. **Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Test Debugging**
   ```bash
   pytest --pdb
   pytest --pdb src/tests/test_end_to_end.py::TestParaBankEndToEnd::test_login
   ```

4. **Virtual Environment Issues**
   ```bash
   # Create new virtual environment
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # macOS/Linux
   pip install -r requirements.txt
   ```

## Contributing

1. Follow Python best practices and PEP 8 style guide
2. Write descriptive test names and docstrings
3. Use proper pytest fixtures and markers
4. Add proper type hints and annotations
5. Update documentation for new features
6. Run tests before submitting pull requests

## License

MIT License - see LICENSE file for details