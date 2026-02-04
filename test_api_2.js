const https = require('https');

// Attempt using the User's Token as key
const options = {
  hostname: 'tempmail-so.p.rapidapi.com',
  path: '/domains',
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'FD3789BB-7DA7-3A83-6FA4-329729667B9B',
    'X-RapidAPI-Host': 'tempmail-so.p.rapidapi.com',
  }
};

console.log("Testing with Token as RapidAPI Key...");
const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('RESPONSE:', data);
  });
});

req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
});
req.end();
