const https = require('https');

const API_KEY = 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

function makeRequest(path, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const headers = {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': HOST,
            'Authorization': `Bearer ${AUTH_TOKEN}`
        };

        if (body) {
            headers['Content-Type'] = 'application/json';
        }

        const options = {
            hostname: HOST,
            path: path,
            method: method,
            headers: headers
        };

        console.log(`\n${method} ${path}`);
        console.log('Headers:', JSON.stringify(headers, null, 2));

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`Status: ${res.statusCode}`);
                try {
                    const json = JSON.parse(data);
                    console.log('Response:', JSON.stringify(json, null, 2));
                    resolve({ status: res.statusCode, data: json });
                } catch (e) {
                    console.log('Raw Response:', data);
                    resolve({ status: res.statusCode, raw: data });
                }
            });
        });
        
        req.on('error', (e) => {
            console.error('Error:', e);
            reject(e);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function testFlow() {
    try {
        // 1. Get Domains
        console.log('=== STEP 1: Get Domains ===');
        const domainRes = await makeRequest('/domains');
        
        if (domainRes.status !== 200 || !domainRes.data || domainRes.data.code !== 0) {
            console.error('\n❌ Failed to get domains');
            return;
        }

        const domain = domainRes.data.data[0].domain;
        const name = Math.random().toString(36).substring(2, 10);
        const emailAddress = `${name}@${domain}`;
        
        console.log(`\n✓ Selected: ${emailAddress}`);

        // 2. Create Inbox
        console.log('\n=== STEP 2: Create Inbox ===');
        const createRes = await makeRequest('/inboxes', 'POST', {
            name: name,
            domain: domain,
            lifespan: 3600
        });

        if (createRes.data && createRes.data.code === 0) {
            console.log(`\n✅ SUCCESS! Email created: ${emailAddress}`);
        } else {
            console.log(`\n❌ Failed to create inbox`);
            console.log('Response:', createRes.data);
        }

    } catch (error) {
        console.error("\n❌ Error:", error);
    }
}

testFlow();
