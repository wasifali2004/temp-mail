const https = require('https');

// Load from .env manually or use provided default for testing
const API_KEY = process.env.RAPID_API || 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const HOST = 'tempmail-so.p.rapidapi.com';

// You can uncomment this if the provider requires a separate auth token
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B'; 

console.log(`Checking RapidAPI connection...`);
console.log(`Host: ${HOST}`);
console.log(`Key (first 4): ${API_KEY.substring(0,4)}...`);

const options = {
    hostname: HOST,
    path: '/domains',
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': HOST,
        // 'Authorization': AUTH_TOKEN, // Try enabling/disabling this
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log(`\nResponse Status: ${res.statusCode}`);
        console.log(`Response Body: ${data}`);
        
        if (res.statusCode === 200) {
            console.log("\n✅ SUCCESS: API Key is valid and domains can be fetched.");
        } else {
            console.log("\n❌ ERROR: API request failed.");
            console.log("Please check if your RAPID_API key is correct and you are subscribed to the 'Temp Mail' (tempmail-so) API on RapidAPI.");
            if (data.includes("Invalid Login Credential")) {
                console.log("Specific Error: 'Invalid Login Credential'. This usually means the API Key or Auth Token is rejected.");
            }
        }
    });
});

req.on('error', (e) => {
    console.error(`\n❌ NETWORK ERROR: ${e.message}`);
});

req.end();
