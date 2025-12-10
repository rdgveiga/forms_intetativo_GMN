import { LeadData } from '../types';

export const sendLeadData = async (data: LeadData): Promise<boolean> => {
  // Simulate Webhook delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // In a real app, uncomment and configure:
    /*
    const response = await fetch('YOUR_WEBHOOK_URL_HERE', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    */
    
    // Logging for demo purposes
    console.log('Lead Data Submitted:', data);
    return true; 
  } catch (error) {
    console.error('Submission error:', error);
    return false;
  }
};