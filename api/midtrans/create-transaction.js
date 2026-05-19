export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    
    if (!serverKey) {
      throw new Error('MIDTRANS_SERVER_KEY is missing from environment');
    }

    const serverKeyBase64 = Buffer.from(serverKey + ':').toString('base64');
    const isProduction = !serverKey.startsWith('SB-');
    const midtransUrl = isProduction
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    const parameter = {
      transaction_details: {
        order_id: data.order_id,
        gross_amount: Math.round(data.gross_amount)
      },
      credit_card: { secure: true },
      customer_details: data.customer_details,
      item_details: data.item_details
    };

    const response = await fetch(midtransUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${serverKeyBase64}`
      },
      body: JSON.stringify(parameter)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error_messages ? result.error_messages.join(', ') : 'Midtrans API Error');
    }

    return res.status(200).json({ token: result.token, redirect_url: result.redirect_url });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
