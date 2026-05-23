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

  // Helper to parse body
  const parseBody = () => new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });

  // Helper: minimal res adapter for Vercel-style handlers
  const makeResAdapter = (nodeRes) => {
    const headers = {};
    return {
      status: (code) => ({ 
        json: (data) => { nodeRes.writeHead(code, { 'Content-Type': 'application/json', ...headers }); nodeRes.end(JSON.stringify(data)); },
        end: () => { nodeRes.writeHead(code); nodeRes.end(); }
      }),
      setHeader: (k, v) => { headers[k] = v; nodeRes.setHeader(k, v); },
      writeHead: (code, h) => nodeRes.writeHead(code, h || {}),
      end: (data) => nodeRes.end(data)
    };
  };

  const url = req.url?.split('?')[0];

  // Dynamic handler routing
  const handlerRoutes = {
    '/api/duitku/create-transaction': './api/duitku/create-transaction.js',
    '/api/webhook/wa': './api/webhook/wa.js',
    '/api/webhook/order-created': './api/webhook/order-created.js',
    '/api/reminders/process': './api/reminders/process.js',
    '/api/agent/reply': './api/agent/reply.js',
    '/api/agent/config': './api/agent/config.js',
  };

  if (handlerRoutes[url]) {
    const body = await parseBody();
    const reqAdapter = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body
    };
    const resAdapter = makeResAdapter(res);
    try {
      const mod = await import(handlerRoutes[url] + '?t=' + Date.now());
      const handler = mod.default;
      await handler(reqAdapter, resAdapter);
    } catch (err) {
      console.error(`[Server] Handler error for ${url}:`, err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // 404 fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found', path: req.url }));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`[Dev Server] API Backend running on http://localhost:${PORT}`);
  console.log('[Dev Server] Routes:');
  console.log('  POST /api/duitku/create-transaction');
  console.log('  POST /api/webhook/wa');
  console.log('  POST /api/webhook/order-created');
  console.log('  POST /api/reminders/process');
  console.log('  POST /api/agent/reply');
  console.log('  GET|PATCH /api/agent/config');
});
