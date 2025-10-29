import { GOOGLE_SCRIPT_URL } from '../config';

export const submitToGoogleSheet = async (data: Record<string, any>): Promise<void> => {
  if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
    console.warn('Google Script URL is a placeholder. Simulating successful submission in 1 second.');
    // This timeout simulates a network request for demonstration purposes.
    // In a real scenario, you would throw an error to notify the developer.
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    redirect: 'follow', // Google Scripts may issue a redirect, which we need to follow.
  });

  if (!response.ok) {
    // We can't always read the error body due to CORS and redirects,
    // but we can check the status to see if the request was successful.
    throw new Error(`Submission failed with status: ${response.status}`);
  }
  
  // If no network error is thrown, we assume the submission was successful.
};
