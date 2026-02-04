const https = require('https');

const API_KEY = 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const HOST = 'tempmail-so.p.rapidapi.com';

function request(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      path: path,
      method: method,
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': HOST,
        'Content-Type': 'application/json'
      }
    };

    console.log(`Sending ${method} request to ${path}...`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        try {
            if (data) {
                 const json = JSON.parse(data);
                 console.log('Body:', JSON.stringify(json, null, 2));
                 resolve({ status: res.statusCode, data: json });
            } else {
                console.log('Body: <empty>');
                resolve({ status: res.statusCode, data: null });
            }
        } catch (e) {
            console.log('Body:', data);
            resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function testAuth() {
  try {
    // Test 1: Get Auth Token
    console.log('--- Testing Authentication ---');
    const authRes = await request('/auth');
    
    if (authRes.data && authRes.data.token) {
      console.log('\n✓ Got auth token:', authRes.data.token);
      return authRes.data.token;
    } else {
      console.log('\n✗ Failed to get auth token');
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

testAuth();
