// This URL is loaded from an environment variable.
// In development, create a .env file with VITE_GOOGLE_SCRIPT_URL="your_url"
// In production (Cloudflare), set this in the project's Environment Variables settings.
// Fix: Use process.env to avoid TypeScript errors with import.meta.env when type definitions are not available.
export const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
