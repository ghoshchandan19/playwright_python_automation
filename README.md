# Playwright TypeScript Automation Framework

A comprehensive Playwright automation framework built with TypeScript for web application testing.

## Features

- **TypeScript Support**: Full type safety and modern JavaScript features
- **Page Object Model**: Organized page objects for maintainable test code
- **Cross-browser Testing**: Support for Chromium, Firefox, and WebKit
- **API Testing**: Integrated API testing capabilities
- **Parallel Execution**: Fast test execution with parallel runs
- **Rich Reporting**: HTML, JSON, and JUnit reports
- **Screenshots & Videos**: Automatic capture on test failures

## Project Structure

```
src/
├── pages/           # Page Object Model classes
│   ├── LoginPage.ts
│   ├── RegistrationPage.ts
│   ├── HomePage.ts
│   └── NewAccountPage.ts
├── tests/           # Test files
│   ├── end-to-end.spec.ts
│   └── api.spec.ts
├── constants/       # Application constants and configuration
│   └── application-constants.ts
├── config/          # Configuration files
│   └── urls.ts
└── data/            # Test data and credentials
    └── credentials.json
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright-typescript-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## Configuration

The framework is configured via `playwright.config.ts` with the following features:

- **Base URL**: https://parabank.parasoft.com
- **Parallel Execution**: Enabled for faster test runs
- **Retry Logic**: Automatic retry on failure
- **Screenshots**: Captured on test failures
- **Videos**: Recorded for failed tests
- **Multiple Browsers**: Chromium, Firefox, WebKit

## Running Tests

### Basic Test Execution

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (visible browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Run tests with UI mode
npx playwright test --ui
```

### Specific Test Execution

```bash
# Run specific test file
npx playwright test src/tests/end-to-end.spec.ts

# Run tests matching a pattern
npx playwright test --grep "login"

# Run tests in specific browser (Chromium only)
npx playwright test --project=chromium

# Run tests without retries
npx playwright test --retries=0
```

### Test Reports

```bash
# View HTML report
npx playwright show-report

# Generate JSON report
npx playwright test --reporter=json

# Generate JUnit report
npx playwright test --reporter=junit
```

## CI/CD Pipeline

This project includes a GitHub Actions workflow for automated testing:

### GitHub Actions Configuration

The CI pipeline (`/.github/workflows/github.yml`) runs on:
- **Triggers**: Push to `main`/`develop` branches and pull requests to `main`
- **Environment**: Ubuntu latest
- **Node.js**: Version 18
- **Browser**: Chromium only (for faster CI execution)
- **Retries**: Disabled (`--retries=0`) for cleaner CI results

### Pipeline Steps

1. **Checkout code** - Downloads the repository
2. **Setup Node.js** - Installs Node.js 18
3. **Install dependencies** - Runs `npm install`
4. **Install Playwright browsers** - Installs Chromium with dependencies
5. **Run tests** - Executes tests on Chromium only
6. **Upload test results** - Saves test reports as artifacts (30-day retention)

### Viewing CI Results

- Test reports are automatically uploaded as artifacts
- Download the `playwright-report` artifact to view detailed test results
- Check the Actions tab in GitHub for pipeline status

## Test Examples

### Page Object Model Usage

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('User login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('username', 'password');
  await expect(page).toHaveTitle('Dashboard');
});
```

### API Testing

```typescript
test('API authentication', async ({ request }) => {
  const response = await request.post('/api/login', {
    data: { username: 'user', password: 'pass' }
  });
  expect(response.status()).toBe(200);
});
```

## Page Objects

### LoginPage
- Handles user authentication
- Methods: `login(username, password)`

### RegistrationPage
- Manages user registration
- Methods: `registerUser()`, `generateRandomUsername()`

### HomePage
- Navigation and menu verification
- Methods: `verifyHomescreenMenu()`, `verifyEmpScreen()`, `verifyCustomerScreen()`

### NewAccountPage
- Account management operations
- Methods: `createSavingsAccount()`, `transferFunds()`, `payBill()`

## Utilities

### Test Data Management
- **Dynamic Credentials**: Automatically loads credentials from `data/credentials.json`
- **Random Username Generation**: Creates unique usernames for each test run
- **Centralized Constants**: All selectors, URLs, and test data in `application-constants.ts`
- **Fallback Credentials**: Uses default credentials if JSON file doesn't exist

### Configuration Files
- **`application-constants.ts`**: Centralized configuration, selectors, and test data
- **`urls.ts`**: Application URLs and endpoints
- **`playwright.config.ts`**: Playwright configuration and browser settings

## Best Practices

1. **Use TypeScript**: Leverage type safety for better code quality
2. **Page Object Model**: Keep page interactions in dedicated classes
3. **Async/Await**: Use modern async patterns for better readability
4. **Descriptive Test Names**: Write clear, descriptive test names
5. **Wait Strategies**: Use proper wait conditions instead of hard sleeps
6. **Error Handling**: Implement proper error handling and assertions

## Troubleshooting

### Common Issues

1. **Browser Installation**
   ```bash
   npx playwright install
   ```

2. **TypeScript Compilation**
   ```bash
   npx tsc --noEmit
   ```

3. **Test Debugging**
   ```bash
   npx playwright test --debug
   ```

## Contributing

1. Follow TypeScript best practices
2. Write descriptive test names
3. Use proper async/await patterns
4. Add proper type annotations
5. Update documentation for new features

## License

MIT License - see LICENSE file for details