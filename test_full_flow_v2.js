const https = require('https');

// Defaults
const API_KEY = process.env.RAPID_API || 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

function makeRequest(path, method = 'GET', body = null) {
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

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ status: res.statusCode, data: json });
                } catch (e) {
                    console.error("JSON Parse Error:", e);
                    resolve({ status: res.statusCode, raw: data });
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
    console.log("1. Get Domains...");
    const domainRes = await makeRequest('/domains');
    console.log(`Status: ${domainRes.status}`);
    
    // Logic to find domain
    let domains = [];
    if (domainRes.data) {
        if (Array.isArray(domainRes.data)) domains = domainRes.data;
        else if (domainRes.data.data) domains = domainRes.data.data;
        else if (domainRes.data.domains) domains = domainRes.data.domains;
    }
    
    if (domains.length === 0) {
        console.log("No domains found. Body:", JSON.stringify(domainRes));
        return;
    }
    
    let domainStr = domains[0];
    if (domainStr.domain) domainStr = domainStr.domain;
    console.log(`Using domain: ${domainStr}`);
    
    const name = `test_${Math.floor(Math.random()*1000)}`;
    
    console.log("2. Create Inbox...");
    const inboxRes = await makeRequest('/inboxes', 'POST', {
        name: name,
        domain: domainStr,
        lifespan: 1000
    });
    console.log(`Status: ${inboxRes.status}`); // Should be 200 or 201
    
    console.log("3. Check Messages...");
    const validEmail = `${name}@${domainStr}`;
    // Try endpoint variations
    const msgRes = await makeRequest(`/messages?name=${name}&domain=${domainStr}`);
    console.log(`Msg Status: ${msgRes.status}`);
    console.log(`Msg Body:`, JSON.stringify(msgRes.data).substring(0, 200));
}

run();
