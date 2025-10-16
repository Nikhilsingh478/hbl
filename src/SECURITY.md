# Security Best Practices - HBL Engineering Website

## Overview
This document outlines the security measures implemented in the HBL Engineering website and recommendations for deployment.

## Implemented Security Features

### 1. Input Sanitization
- All user inputs are sanitized to prevent XSS (Cross-Site Scripting) attacks
- HTML special characters are encoded
- Script tags and event handlers are removed
- Located in: `/components/ui/security.ts`

### 2. Form Validation
- Email format validation using regex
- Phone number format validation
- Input length restrictions (maxLength attributes)
- Required field validation

### 3. Rate Limiting
- Client-side rate limiting for form submissions
- Prevents spam and brute force attacks
- Default: 3 attempts per minute per form
- Configurable in `/components/ui/security.ts`

### 4. Performance Optimizations
- Lazy loading of sections for faster initial load
- Code splitting with React Suspense
- Optimized images with proper sizing
- Reduced motion support for accessibility

### 5. Accessibility & UX Security
- Custom cursor disabled on mobile/touch devices
- ARIA labels for screen readers
- Keyboard navigation support
- Semantic HTML structure

## Recommended Server-Side Security Headers

Add these headers to your hosting configuration (Vercel, Netlify, or custom server):

```nginx
# Content Security Policy
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://esm.sh https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';

# Prevent clickjacking
X-Frame-Options: DENY

# Prevent MIME type sniffing
X-Content-Type-Options: nosniff

# Enable XSS protection
X-XSS-Protection: 1; mode=block

# Referrer policy
Referrer-Policy: strict-origin-when-cross-origin

# Permissions policy
Permissions-Policy: geolocation=(), microphone=(), camera=()

# HSTS (HTTPS only)
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### For Vercel (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### For Netlify (netlify.toml)
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## Backend Integration Checklist

When connecting to a backend API:

- [ ] Use HTTPS only in production
- [ ] Implement server-side rate limiting
- [ ] Validate all inputs on the server
- [ ] Use parameterized queries for databases
- [ ] Implement proper authentication (JWT, OAuth)
- [ ] Store secrets in environment variables
- [ ] Enable CORS with specific origins only
- [ ] Implement request logging and monitoring
- [ ] Use API keys for sensitive operations
- [ ] Implement proper error handling (don't expose stack traces)

## Form Submission Security

The contact form includes:
- Input sanitization before display
- Email validation
- Client-side rate limiting
- Maximum length restrictions
- XSS prevention

**Important**: Always validate and sanitize inputs on the server-side as well!

## Data Privacy

- No analytics or tracking implemented by default
- No cookies used
- No personal data stored in localStorage
- Comply with GDPR/privacy regulations when collecting user data

## Regular Security Audits

Recommended tools:
- `npm audit` - Check for vulnerable dependencies
- OWASP ZAP - Security scanning
- Lighthouse - Performance and security audit
- Snyk - Dependency vulnerability scanning

Run these commands regularly:
```bash
npm audit
npm audit fix
```

## Reporting Security Issues

If you discover a security vulnerability, please email: security@hbl.in

Do NOT create public GitHub issues for security vulnerabilities.

## Updates and Maintenance

- Keep dependencies updated regularly
- Review security patches monthly
- Test security headers after deployment
- Monitor for suspicious form submissions
- Regular backups of any data collected

## License & Compliance

Ensure compliance with:
- GDPR (if handling EU citizens' data)
- Indian IT Act 2000
- Industry-specific regulations (defense, aerospace)

---

Last Updated: October 2025
