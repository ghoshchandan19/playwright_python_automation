# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the Playwright TypeScript Automation Framework.

## 📋 Workflow Overview

### 1. **GitHub Pipeline** (`github.yml`)
**Triggers:** Push to main/develop, Pull Requests

**Jobs:**
- **Simple Test** - Basic test execution with Node.js setup
- **Dependency Installation** - npm install
- **Test Execution** - npm test
- **Build Process** - npm run build

### 2. **CI/CD Pipeline** (Previously `ci.yml` - Now Removed)
**Status:** Removed for simplification

**Previous Features:**
- Multi-browser testing (Chromium, Firefox, WebKit)
- Cross-platform testing (Ubuntu, Windows, macOS)
- API endpoint validation
- Security audit and vulnerability scanning
- Docker container creation
- Comprehensive test reporting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- GitHub repository with Actions enabled

### Manual Workflow Triggers

#### Run GitHub Pipeline
```bash
# Trigger GitHub pipeline
gh workflow run github.yml

# Check workflow status
gh run list
```

#### Local Testing
```bash
# Install dependencies
npm install

# Run tests locally
npm test

# Build project
npm run build
```

## 📊 Workflow Features

### GitHub Pipeline Features
- **Node.js Setup** - Automatic Node.js 18 installation
- **Dependency Management** - npm install for all dependencies
- **Test Execution** - Automated test running
- **Build Process** - TypeScript compilation
- **Ubuntu Latest** - Reliable Linux environment

### Trigger Events
- **Push Events** - Triggers on main and develop branches
- **Pull Requests** - Triggers on PRs to main branch
- **Manual Triggers** - On-demand execution via GitHub CLI

### Basic Test Categories
- **Unit Tests** - Individual component testing
- **Integration Tests** - Component interaction testing
- **Build Validation** - TypeScript compilation verification

## 🔧 Configuration

### GitHub Pipeline Configuration
```yaml
# Basic workflow structure
name: GitHub Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  simple-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build
```

### Environment Variables
```yaml
NODE_VERSION: '18'
TEST_TIMEOUT: '30000'  # 30 seconds
```

## 📈 Monitoring & Reporting

### Test Results
- **GitHub Actions UI** - Real-time test execution
- **Artifact Downloads** - Test reports and screenshots
- **Summary Comments** - PR test result summaries
- **Email Notifications** - Test failure alerts

### Security Reports
- **SARIF Integration** - Security findings in GitHub Security tab
- **Dependency Alerts** - Automated vulnerability notifications
- **License Compliance** - Open source license validation

### Performance Metrics
- **Execution Time** - Test duration tracking
- **Success Rate** - Test pass/fail statistics
- **Resource Usage** - CPU and memory monitoring

## 🛠️ Customization

### Adding New Tests
1. Create test file in `src/tests/`
2. Add to appropriate workflow job
3. Update test matrix if needed


### Custom Security Rules
1. Create `.eslintrc.security.json`
2. Configure Snyk policies
3. Add custom security checks

## 📚 Best Practices

### Workflow Design
- **Fail Fast** - Stop on critical failures
- **Parallel Execution** - Run independent jobs in parallel
- **Conditional Steps** - Skip unnecessary steps
- **Resource Optimization** - Use appropriate runner sizes

### Security
- **Least Privilege** - Minimal required permissions
- **Secret Management** - Secure secret handling
- **Dependency Updates** - Regular security updates
- **Code Scanning** - Continuous security validation

### Maintenance
- **Regular Updates** - Keep actions and dependencies current
- **Monitoring** - Track workflow performance
- **Documentation** - Keep workflow documentation updated
- **Testing** - Validate workflow changes

## 🆘 Troubleshooting

### Common Issues
1. **Timeout Errors** - Increase timeout values
2. **Browser Installation** - Check Playwright browser installation
3. **Permission Errors** - Verify GitHub token permissions
4. **Resource Limits** - Optimize test execution

### Debug Steps
1. Check workflow logs in GitHub Actions
2. Download and review test artifacts
3. Run tests locally to reproduce issues
4. Check environment and dependency versions

### Support
- **GitHub Issues** - Report workflow problems
- **Documentation** - Check Playwright and GitHub Actions docs
- **Community** - GitHub Actions and Playwright communities
