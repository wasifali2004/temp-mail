const https = require('https');

const API_KEY = process.env.RAPID_API || 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

function toHex(str) {
    return Buffer.from(str).toString('hex');
}

async function test(auth, label) {
    console.log(`--- Testing ${label} ---`);
    console.log(`Key Hex:  ${toHex(API_KEY)}`);
    console.log(`Auth Hex: ${toHex(auth)}`);
    
    return new Promise((resolve) => {
        const options = {
            hostname: HOST,
            path: '/domains',
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': HOST,
                'Authorization': auth,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`Status: ${res.statusCode}`);
                console.log(`Body: ${data}`);
                resolve();
            });
        });
        req.end();
    });
}

async function run() {
    await test(AUTH_TOKEN, "AUTH_TOKEN variable");
}

run();
