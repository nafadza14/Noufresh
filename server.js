import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple native parser for .env
const envPath = path.join(__dirname, '.env');
const env = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      env[key] = value.trim();
    }
  });
}

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/duitku/create-transaction') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const merchantCode = env.DUITKU_MERCHANT_CODE || process.env.DUITKU_MERCHANT_CODE || 'DS30915';
        const apiKey = env.DUITKU_API_KEY || process.env.DUITKU_API_KEY || 'd4413f3c2a676093c87f4b681456590d';
        
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

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          reference: result.reference,
          paymentUrl: result.paymentUrl,
          statusCode: result.statusCode,
          statusMessage: result.statusMessage
        }));
      } catch (error) {
        console.error('Server Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Zero-dependency Backend running on port ${PORT}`);
});
