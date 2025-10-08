"""
Configuration settings for the ParaBank automation framework.
"""
import os
from typing import Dict, Any
# Environment variables will be loaded from system environment


class Config:
    """Configuration class for application settings."""
    
    def __init__(self):
        self.name = "ParaBank"
        self.version = "1.0.0"
        self.base_url = os.getenv("BASE_URL", "https://parabank.parasoft.com")
        self.headless = os.getenv("HEADLESS", "true").lower() == "true"
        self.slow_mo = int(os.getenv("SLOW_MO", "0"))
        self.timeout = int(os.getenv("TIMEOUT", "30000"))
        self.browser_type = os.getenv("BROWSER", "chromium")
        self.viewport_width = int(os.getenv("VIEWPORT_WIDTH", "1920"))
        self.viewport_height = int(os.getenv("VIEWPORT_HEIGHT", "1080"))
        self.retry_attempts = int(os.getenv("RETRY_ATTEMPTS", "3"))
        self.screenshot_quality = int(os.getenv("SCREENSHOT_QUALITY", "80"))
        
        # Timeout configurations
        self.timeouts = {
            "default": int(os.getenv("DEFAULT_TIMEOUT", "30000")),
            "short": int(os.getenv("SHORT_TIMEOUT", "5000")),
            "long": int(os.getenv("LONG_TIMEOUT", "60000")),
            "network_idle": int(os.getenv("NETWORK_IDLE_TIMEOUT", "1000"))
        }
    
    def get_browser_options(self) -> Dict[str, Any]:
        """Get browser launch options."""
        return {
            "headless": self.headless,
            "slow_mo": self.slow_mo
        }
    
    def get_context_options(self) -> Dict[str, Any]:
        """Get browser context options."""
        return {
            "viewport": {"width": self.viewport_width, "height": self.viewport_height},
            "ignore_https_errors": True
        }
    
    def get_timeout(self, timeout_type: str = "default") -> int:
        """Get timeout value by type."""
        return self.timeouts.get(timeout_type, self.timeouts["default"])


# Global configuration instance
config = Config()
