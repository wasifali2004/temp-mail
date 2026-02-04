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

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ status: res.statusCode, data: json });
                } catch (e) {
                    resolve({ status: res.statusCode, raw: data });
                }
            });
        });
        
        req.on('error', reject);

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function testFlow() {
    try {
        console.log('1. Getting domains...');
        const domainRes = await makeRequest('/domains');
        
        if (domainRes.data.code !== 0) {
            console.error('❌ Failed:', domainRes.data.message);
            return;
        }

        const domain = domainRes.data.data[0].domain;
        const name = Math.random().toString(36).substring(2, 10);
        const emailAddress = `${name}@${domain}`;
        
        console.log(`2. Creating inbox: ${emailAddress}`);
        const createRes = await makeRequest('/inboxes', 'POST', {
            name: name,
            domain: domain,
            lifespan: 1800  // 30 minutes - free plan limit
        });

        if (createRes.data && createRes.data.code === 0) {
            console.log(`✅ SUCCESS! Email: ${emailAddress}`);
        } else {
            console.log(`❌ Failed: ${createRes.data.message} (code: ${createRes.data.code})`);
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

testFlow();
