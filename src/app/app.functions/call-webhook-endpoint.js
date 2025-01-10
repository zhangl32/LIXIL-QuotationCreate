// For HubSpot API calls
const axios = require('axios');
const hubspot = require('@hubspot/api-client');

exports.main = async (context = {}) => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env['PRIVATE_APP_ACCESS_TOKEN'],
  });
  
  // DealId
  const { dealId } = context.parameters;

  try {
      await callWebhookEndpoint(dealId);
      return { status: 'success', meesage:"Workflow initiated successfully. Please wait for 4-5 minutes while the system completes the processing.  Thank you for your patience!" };
  } catch (err) {
    return { status: 'error', message: err.message }
  }
};


const callWebhookEndpoint = async (dealId) => {
  return axios.post(
    `https://api-na1.hubapi.com/automation/v4/webhook-triggers/39703267/Kfk2IH8`,
    {
        dealId: dealId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
