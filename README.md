# Playwright TypeScript Automation Framework

A comprehensive Playwright automation framework built with TypeScript for web application testing.

## Features

- **TypeScript Support**: Full type safety and modern JavaScript features
- **Page Object Model**: Organized page objects for maintainable test code
- **Cross-browser Testing**: Support for Chromium, Firefox, and WebKit
- **Mobile Testing**: Responsive testing on mobile devices
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
│   ├── demo.spec.ts
│   └── api.spec.ts
├── utils/           # Utility functions
│   └── testData.ts
├── fixtures/        # Custom test fixtures
│   └── testFixtures.ts
└── data/            # Test data and credentials
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
   npm run install:browsers
   ```

## Configuration

The framework is configured via `playwright.config.ts` with the following features:

- **Base URL**: https://parabank.parasoft.com
- **Parallel Execution**: Enabled for faster test runs
- **Retry Logic**: Automatic retry on failure
- **Screenshots**: Captured on test failures
- **Videos**: Recorded for failed tests
- **Multiple Browsers**: Chromium, Firefox, WebKit
- **Mobile Testing**: iPhone 12, Pixel 5

## Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with UI mode
npm run test:ui
```

### Specific Test Execution

```bash
# Run specific test file
npx playwright test demo.spec.ts

# Run tests matching a pattern
npx playwright test --grep "login"

# Run tests in specific browser
npx playwright test --project=chromium
```

### Test Reports

```bash
# View HTML report
npm run test:report

# Generate JSON report
npx playwright test --reporter=json
```

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

### Test Data
- `generateRandomUsername()`: Creates unique usernames
- `TEST_DATA`: Common test constants and URLs

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