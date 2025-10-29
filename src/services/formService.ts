import { GOOGLE_SCRIPT_URL } from '../config';

export const submitToGoogleSheet = async (data: Record<string, any>): Promise<void> => {
  if (!GOOGLE_SCRIPT_URL) {
    console.error('Google Script URL is not configured. Please set VITE_GOOGLE_SCRIPT_URL environment variable.');
    throw new Error('The form submission service is not configured correctly.');
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // We must use 'no-cors' mode for this type of request to a Google Apps Script.
    // The script will still execute successfully, but we won't be able to read the response.
    // This is a standard approach for client-side submissions to Google Scripts.
    mode: 'no-cors', 
    body: JSON.stringify(data),
  });

  // Since we use 'no-cors', we cannot inspect the response. 
  // We have to optimistically assume the request was sent successfully if no network error was thrown.
  // The Google Apps Script itself should handle any data validation errors.
  if (response.type === 'opaque') {
    return; // Success
  }

  // This part will likely not be reached with 'no-cors' but is good practice.
  if (!response.ok) {
    throw new Error(`Submission failed with status: ${response.status}`);
  }
};
