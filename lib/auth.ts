// Admin authentication utilities

// This is a simple hardcoded admin user
// In a real application, you would use a database with proper hashing
export const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123",
};

/**
 * Verifies if the provided credentials match the admin credentials
 * @param email The email to check
 * @param password The password to check
 * @returns A boolean indicating if authentication was successful
 */
export function verifyAdminCredentials(email: string, password: string): boolean {
  return (
    email === ADMIN_CREDENTIALS.email && 
    password === ADMIN_CREDENTIALS.password
  );
}

/**
 * Cookie configuration for admin authentication
 */
export const ADMIN_COOKIE_OPTIONS = {
  // Cookie will expire in 7 days
  maxAge: 7 * 24 * 60 * 60,
  // Allow client-side JavaScript to access the cookie for auth checks
  httpOnly: false,
  // Only send cookie over HTTPS in production
  secure: process.env.NODE_ENV === 'production',
  // Restrict cookie to this domain
  path: '/',
};
