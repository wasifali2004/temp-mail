const https = require('https');

const API_KEY = process.env.RAPID_API || 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152'; // Use the key from env file viewed earlier
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

function makeRequest(path, method = 'GET', body = null) {
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
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            console.log(`[${method} ${path}] STATUS: ${res.statusCode}`);
            // console.log(`BODY: ${data.substring(0, 200)}...`); 
            console.log(`BODY: ${data}`);
        });
    });

    req.on('error', (e) => {
        console.error(`[${method} ${path}] ERROR: ${e.message}`);
    });

    if (body) {
        req.write(JSON.stringify(body));
    }
    req.end();
}

// 1. Try to list inboxes to see structure? Or maybe messages is sub-resource
// makeRequest('/inboxes');

// 2. Try to get messages for a hypothetical inbox
// specific structure might be /inboxes/name/domain/messages or /messages?inbox_id=...
const name = 'testuser2';
const domain = 'example.com';

console.log("Probing endpoints...");
// makeRequest(`/messages?name=${name}&domain=${domain}`); // We know this fails (404)

// Try typical REST patterns
makeRequest(`/inboxes/${name}/${domain}/messages`);
makeRequest(`/inboxes/${name}@${domain}/messages`);
makeRequest(`/emails?name=${name}&domain=${domain}`);
makeRequest(`/inboxes`); // Maybe this lists inboxes and their messages?

