const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const assets = {
  'logo.png': 'https://i.imgur.com/TPWEtiW.png',
  'carousel-1.jpg': 'https://i.imgur.com/wG4d6uJ.jpeg',
  'carousel-2.jpg': 'https://i.imgur.com/yX48gC3.jpeg',
  'carousel-3.jpg': 'https://i.imgur.com/GqPAvSx.jpeg',
  'carousel-4.jpg': 'https://i.imgur.com/Lco1wsC.jpeg',
  'carousel-5.jpg': 'https://i.imgur.com/lmlpXg8.jpeg',
  'carousel-6.jpg': 'https://i.imgur.com/2LqWJtE.jpeg',
  'bottom-cta.png': 'https://i.imgur.com/HdqsOM6.png',
  'bpom.png': 'https://upload.wikimedia.org/wikipedia/id/thumb/a/a8/BADAN_POM.png/330px-BADAN_POM.png',
  'halal.svg': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Halal_Indonesia.svg'
};

const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('Created public directory');
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    
    const request = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://imgur.com/'
      }
    }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${path.basename(dest)}`);
        resolve();
      });
    });
    
    request.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function start() {
  console.log('Starting assets download...');
  for (const [filename, url] of Object.entries(assets)) {
    try {
      const dest = path.join(publicDir, filename);
      await download(url, dest);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error.message);
    }
  }
  console.log('All downloads complete!');
}

start();
