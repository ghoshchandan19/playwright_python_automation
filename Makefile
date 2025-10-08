# ParaBank Python Automation Framework Makefile

.PHONY: help install install-browsers test test-smoke test-regression test-api test-ui test-headed test-parallel clean lint format setup

# Default target
help:
	@echo "ParaBank Python Automation Framework"
	@echo "===================================="
	@echo ""
	@echo "Available targets:"
	@echo "  setup           - Complete setup (install deps + browsers)"
	@echo "  install         - Install Python dependencies"
	@echo "  install-browsers - Install Playwright browsers"
	@echo "  test            - Run all tests"
	@echo "  test-smoke      - Run smoke tests only"
	@echo "  test-regression - Run regression tests only"
	@echo "  test-api        - Run API tests only"
	@echo "  test-ui         - Run UI tests only"
	@echo "  test-headed     - Run tests in headed mode"
	@echo "  test-parallel   - Run tests in parallel"
	@echo "  test-report     - Run tests with HTML report"
	@echo "  test-coverage   - Run tests with coverage report"
	@echo "  test-allure     - Run tests with Allure report"
	@echo "  clean           - Clean up generated files"
	@echo "  lint            - Run linting checks"
	@echo "  format          - Format code with black"
	@echo ""

# Setup
setup: install install-browsers
	@echo "✅ Setup complete!"

# Installation
install:
	@echo "📦 Installing Python dependencies..."
	pip install -r requirements.txt

install-browsers:
	@echo "🌐 Installing Playwright browsers..."
	playwright install

# Testing
test:
	@echo "🧪 Running all tests..."
	pytest src/tests/ -v

test-smoke:
	@echo "🔥 Running smoke tests..."
	pytest src/tests/ -m smoke -v

test-regression:
	@echo "🔄 Running regression tests..."
	pytest src/tests/ -m regression -v

test-api:
	@echo "🔌 Running API tests..."
	pytest src/tests/ -m api -v

test-ui:
	@echo "🖥️  Running UI tests..."
	pytest src/tests/ -m ui -v

test-headed:
	@echo "👁️  Running tests in headed mode..."
	HEADLESS=false pytest src/tests/ -v

test-parallel:
	@echo "⚡ Running tests in parallel..."
	pytest src/tests/ -n auto -v

test-report:
	@echo "📊 Running tests with HTML report..."
	pytest src/tests/ --html=reports/report.html --self-contained-html -v

test-coverage:
	@echo "📈 Running tests with coverage report..."
	pytest src/tests/ --cov=src --cov-report=html:reports/coverage --cov-report=term-missing -v

test-allure:
	@echo "🎨 Running tests with Allure report..."
	pytest src/tests/ --alluredir=reports/allure-results -v

# Code quality
lint:
	@echo "🔍 Running linting checks..."
	flake8 src/ tests/
	mypy src/

format:
	@echo "🎨 Formatting code..."
	black src/ tests/

# Cleanup
clean:
	@echo "🧹 Cleaning up generated files..."
	rm -rf __pycache__/
	rm -rf .pytest_cache/
	rm -rf .coverage
	rm -rf htmlcov/
	rm -rf reports/
	rm -rf screenshots/
	rm -rf test-results/
	rm -rf playwright-report/
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
