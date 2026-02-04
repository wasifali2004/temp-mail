const https = require('https');

const API_KEY = process.env.RAPID_API || 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
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
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json'
      }
    };
    
    
    console.log(`REQ: ${method} ${path}`);
    console.log(`Key: ${API_KEY.substring(0, 5)}...`);
    console.log(`Auth: ${AUTH_TOKEN.substring(0, 5)}...`);
    console.log(`Headers:`, JSON.stringify(options.headers));

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
            const json = JSON.parse(data);
            resolve({ status: res.statusCode, data: json });
        } catch (e) {
            resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function run() {
    console.log("--- 1. Testing Domains ---");
    const domainRes = await request('/domains');
    if (domainRes.status !== 200) {
        console.error("FAILED to get domains:", domainRes.data);
        return;
    }
    const json = domainRes.data;
    console.log("Raw Response Data:", JSON.stringify(json, null, 2));
    
    let domains = [];
    if (Array.isArray(json)) domains = json;
    else if (json && json.data && Array.isArray(json.data)) domains = json.data;
    else if (json && json.domains && Array.isArray(json.domains)) domains = json.domains;
    
    console.log("Domains count:", domains.length);
    
    if (domains.length === 0) {
        console.error("No domains in list");
        return;
    }
    
    let domain = domains[0];
    if (domain.domain) domain = domain.domain;
    const name = `test_${Math.floor(Math.random() * 1000)}`;
    const email = `${name}@${domain}`;
    console.log(`\n--- 2. Creating Inbox for ${email} ---`);
    
    const createRes = await request('/inboxes', 'POST', {
        name: name,
        domain: domain,
        lifespan: 1000
    });
    
    if (createRes.status !== 200 && createRes.status !== 201) {
        console.error("FAILED to create inbox:", createRes.data);
    } else {
        console.log("SUCCESS. Inbox created.");
    }

    console.log(`\n--- 3. Checking Messages for ${email} ---`);
    console.log(`Path: /messages?name=${name}&domain=${domain}`);
    const msgRes = await request(`/messages?name=${name}&domain=${domain}`);
    
    if (msgRes.status === 200) {
        console.log("SUCCESS. Messages:", JSON.stringify(msgRes.data));
    } else {
        console.error("FAILED to get messages:", msgRes.data);
    }
    
}

run();
