import crypto from 'crypto';

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
    const merchantCode = process.env.DUITKU_MERCHANT_CODE || 'DS30915';
    const apiKey = process.env.DUITKU_API_KEY || 'd4413f3c2a676093c87f4b681456590d';

    if (!merchantCode || !apiKey) {
      throw new Error('DUITKU_MERCHANT_CODE or DUITKU_API_KEY is missing');
    }

    const timestamp = Date.now().toString();
    const signature = crypto
      .createHash('sha256')
      .update(merchantCode + timestamp + apiKey)
      .digest('hex');

    const paymentAmount = Math.round(data.gross_amount);
    
    // Map customer details for Duitku
    const customerDetail = {
      firstName: data.customer_details?.first_name || 'Customer',
      lastName: data.customer_details?.last_name || '',
      email: data.customer_details?.email || 'no-email@example.com',
      phoneNumber: data.customer_details?.phone || '',
      billingAddress: {
        firstName: data.customer_details?.first_name || 'Customer',
        lastName: data.customer_details?.last_name || '',
        address: data.customer_details?.billing_address?.address || '',
        city: data.customer_details?.billing_address?.city || '',
        postalCode: data.customer_details?.billing_address?.postal_code || '',
        phone: data.customer_details?.phone || '',
        countryCode: 'ID'
      },
      shippingAddress: {
        firstName: data.customer_details?.first_name || 'Customer',
        lastName: data.customer_details?.last_name || '',
        address: data.customer_details?.billing_address?.address || '',
        city: data.customer_details?.billing_address?.city || '',
        postalCode: data.customer_details?.billing_address?.postal_code || '',
        phone: data.customer_details?.phone || '',
        countryCode: 'ID'
      }
    };

    // Map item details
    const itemDetails = (data.item_details || []).map(item => ({
      name: item.name || 'Noufresh Item',
      price: Math.round(item.price),
      quantity: item.quantity || 1
    }));

    const parameter = {
      merchantCode,
      paymentAmount,
      merchantOrderId: data.order_id,
      productDetails: data.item_details?.[0]?.name || 'Noufresh Care Program',
      email: data.customer_details?.email || 'no-email@example.com',
      phoneNumber: data.customer_details?.phone || '',
      itemDetails,
      customerDetail,
      callbackUrl: data.callback_url || 'https://noufreshcare.vercel.app/api/duitku/callback',
      returnUrl: data.return_url || 'https://noufreshcare.vercel.app/checkout/complete',
      expiryPeriod: 60
    };

    const response = await fetch('https://api-sandbox.duitku.com/api/merchant/createInvoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-duitku-signature': signature,
        'x-duitku-timestamp': timestamp,
        'x-duitku-merchantcode': merchantCode
      },
      body: JSON.stringify(parameter)
    });

    const result = await response.json();

    if (!response.ok || (result.statusCode && result.statusCode !== '00')) {
      throw new Error(result.statusMessage || 'Duitku API Error');
    }

    return res.status(200).json({
      reference: result.reference,
      paymentUrl: result.paymentUrl,
      statusCode: result.statusCode,
      statusMessage: result.statusMessage
    });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
