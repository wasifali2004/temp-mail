const https = require('https');

const API_KEY = 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

async function test(withContentType) {
    const headers = {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': HOST,
        'Authorization': AUTH_TOKEN
    };
    if (withContentType) {
        headers['Content-Type'] = 'application/json';
    }

    return new Promise((resolve) => {
        const options = {
            hostname: HOST,
            path: '/domains',
            method: 'GET',
            headers: headers
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`[With CT: ${withContentType}] Code: ${data.includes('code') ? data.match(/"code":(\d+)/)[1] : 'N/A'}`);
                resolve();
            });
        });
        req.end();
    });
}

async function run() {
    await test(false);
    await test(true);
}
run();
