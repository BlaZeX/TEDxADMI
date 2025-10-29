import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This makes environment variables available in your client-side code.
  define: {
    // Fix: Add GOOGLE_SCRIPT_URL to process.env to make it available in client code and resolve TS errors.
    'process.env.GOOGLE_SCRIPT_URL': JSON.stringify(process.env.VITE_GOOGLE_SCRIPT_URL)
  }
})