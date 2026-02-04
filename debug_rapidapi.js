const https = require('https');

const API_KEY = process.env.RAPID_API || 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
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

async function run() {
  try {
    // 1. Get Domains
    console.log('--- 1. Fetching Domains ---');
    const domainsRes = await request('/domains');
    
    if (!domainsRes.data || !domainsRes.data.domains || domainsRes.data.domains.length === 0) {
        console.error("No domains found!");
        return;
    }
    
    const domain = domainsRes.data.domains[0];
    const name = 'testuser_' + Math.floor(Math.random() * 10000);
    console.log(`Selected domain: ${domain}, name: ${name}`);

    // 2. Create Inbox
    console.log('\n--- 2. Creating Inbox ---');
    const createRes = await request('/inboxes', 'POST', {
        name: name,
        domain: domain,
        lifespan: 1000
    });
    
    if (createRes.status !== 200 && createRes.status !== 201) {
        console.error("Failed to create inbox");
    }

    // 3. Check Messages
    console.log('\n--- 3. Checking Messages ---');
    const messagesRes = await request(`/messages?name=${name}&domain=${domain}`);
    
  } catch (error) {
    console.error("Error in run:", error);
  }
}

run();
