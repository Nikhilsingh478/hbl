/**
 * Security Utilities for HBL Engineering Website
 * 
 * SECURITY BEST PRACTICES IMPLEMENTED:
 * 1. Input sanitization to prevent XSS attacks
 * 2. Content Security Policy (CSP) recommendations
 * 3. Safe data handling
 */

/**
 * Sanitize user input to prevent XSS attacks
 * Remove potentially dangerous characters and scripts
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove script tags and event handlers
  let sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '');
  
  // Encode HTML special characters
  const div = document.createElement('div');
  div.textContent = sanitized;
  sanitized = div.innerHTML;
  
  return sanitized.trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic international format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Rate limiting helper for form submissions
 * Prevents spam and brute force attacks
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  canAttempt(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Filter out old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const formRateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute

/**
 * RECOMMENDED CSP HEADERS (to be set on server/hosting):
 * 
 * Content-Security-Policy:
 *   default-src 'self';
 *   script-src 'self' 'unsafe-inline' 'unsafe-eval' https://esm.sh https://cdn.jsdelivr.net;
 *   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
 *   font-src 'self' https://fonts.gstatic.com;
 *   img-src 'self' data: https: blob:;
 *   connect-src 'self' https:;
 *   frame-ancestors 'none';
 *   base-uri 'self';
 *   form-action 'self';
 * 
 * X-Frame-Options: DENY
 * X-Content-Type-Options: nosniff
 * X-XSS-Protection: 1; mode=block
 * Referrer-Policy: strict-origin-when-cross-origin
 * Permissions-Policy: geolocation=(), microphone=(), camera=()
 */

/**
 * Safe localStorage wrapper with error handling
 */
export const safeStorage = {
  setItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },
  
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },
  
  removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  }
};
