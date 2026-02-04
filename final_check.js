const https = require('https');

const API_KEY = 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

function makeRequest() {
    return new Promise((resolve) => {
        const options = {
            hostname: HOST,
            path: '/domains',
            method: 'GET',
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
                resolve({ status: res.statusCode, body: data });
            });
        });
        req.end();
    });
}

async function run() {
    console.log("Running comparative test...");
    const res = await makeRequest();
    console.log("Status:", res.status);
    console.log("Body:", res.body);
    
    if (res.body.includes("Invalid Login Credential")) {
        console.log("FAILED to authenticate.");
    } else if (res.body.includes("pixoledge.net")) {
        console.log("SUCCESSFULLY authenticated!");
    } else {
        console.log("Unknown response.");
    }
}

run();
