import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

  if (req.method === 'POST' && req.url === '/api/midtrans/create-transaction') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const serverKey = env.MIDTRANS_SERVER_KEY || process.env.MIDTRANS_SERVER_KEY;
        
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

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ token: result.token, redirect_url: result.redirect_url }));
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
