const https = require('https');

const API_KEY = process.env.RAPID_API || 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

console.log('DEBUG: API_KEY is', API_KEY);
console.log('DEBUG: AUTH_TOKEN is', AUTH_TOKEN);

function testAuth(authHeaderValue, description) {
    return new Promise((resolve) => {
        const options = {
            hostname: HOST,
            path: '/domains',
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': HOST,
                'Authorization': authHeaderValue,
                'Content-Type': 'application/json'
            }
        };
        console.log(`[${description}] Headers:`, JSON.stringify(options.headers));

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`[${description}] Status: ${res.statusCode}`);
                console.log(`[${description}] Body: ${data}`); // full body
                resolve();
            });
        });
        
        req.on('error', (e) => {
            console.log(`[${description}] Error: ${e.message}`);
            resolve();
        });
        req.end();
    });
}

async function runTags() {
    console.log("Testing Auth Variations...");
    
    // 1. Current
    await testAuth(AUTH_TOKEN, "Raw Token");
    
    // 2. Bearer
    await testAuth(`Bearer ${AUTH_TOKEN}`, "Bearer Token");
    
    // 3. No Auth (Just to see)
    // await testAuth(null, "No Auth Header");
}

runTags();
