// Simple API test
const https = require('https');

// Create an agent that ignores SSL certificate errors
const agent = new https.Agent({
  rejectUnauthorized: false
});

const options = {
  hostname: 'swapi.dev',
  port: 443,
  path: '/api/films/',
  method: 'GET',
  agent: agent
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log('Success! Films count:', parsed.results?.length || 'No results');
      console.log('First film:', parsed.results?.[0]?.title || 'No title');
    } catch (e) {
      console.log('Raw response:', data.substring(0, 200));
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.end();
