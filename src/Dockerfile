FROM node:18-alpine

# Install system dependencies for Playwright
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set working directory
WORKDIR /usr/app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY playwright.config.ts ./

# Install dependencies
RUN npm ci --only=production

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy source code
COPY src/ ./src/

# Build TypeScript
RUN npm run build || npx tsc

# Create reports directory
RUN mkdir -p test-results playwright-report

# Set environment variables
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV CI=true

# Run tests
CMD ["npx", "playwright", "test", "--reporter=html"]