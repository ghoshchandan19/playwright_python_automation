/**
 * Global type definitions for the Playwright TypeScript automation framework
 * 
 * @description This file contains global type definitions and extensions
 * for the Playwright test framework, providing enhanced type safety and
 * better IDE support for custom matchers and assertions.
 */

declare global {
  /**
   * PlaywrightTest namespace for custom matchers
   * 
   * @description Extends the Playwright test framework with custom matchers
   * for enhanced assertion capabilities in tests.
   */
  namespace PlaywrightTest {
    /**
     * Matchers interface for custom assertion methods
     * 
     * @description Defines custom matcher methods that extend the standard
     * Playwright assertions with additional functionality and type safety.
     * 
     * @template R - The return type of the matcher
     */
    interface Matchers<R> {
      /**
       * Custom matcher for element visibility with timeout options
       * 
       * @param options - Optional timeout configuration
       * @returns Promise that resolves when element is visible
       */
      toBeVisible(options?: { timeout?: number }): R;
      
      /**
       * Custom matcher for page title validation
       * 
       * @param title - Expected title as string or RegExp
       * @returns Promise that resolves when title matches
       */
      toHaveTitle(title: string | RegExp): R;
    }
  }
}

export {};
