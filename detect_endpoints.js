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

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve({ status: res.statusCode, body: data }));
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function run() {
    console.log("1. Creating Inbox...");
    const name = Math.random().toString(36).substring(7);
    const domain = 'example.com'; 
    // Domains lookup first?
    try {
        const domRes = await request('/domains');
        console.log("Domains:", domRes.body);
        const domains = JSON.parse(domRes.body).domains || ['example.com'];
        
        const createRes = await request('/inboxes', 'POST', {
            name: name,
            domain: domains[0],
            lifespan: 1000
        });
        
        console.log("Create Res:", createRes.status, createRes.body);
        let inboxData = {};
        try {
             inboxData = JSON.parse(createRes.body);
        } catch(e) {}
        
        // If we got a successful create, try to find the messages endpoint
        if (createRes.status === 200 || createRes.status === 201) {
             const inboxId = inboxData.id || inboxData._id; // Guessing properties
             console.log("Detected ID:", inboxId);
             
             const candidates = [
                 `/inboxes/${name}@${domains[0]}`,
                 `/inboxes/${name}@${domains[0]}/messages`,
                 `/messages?email=${name}@${domains[0]}`,
                 `/messages`, // maybe it lists all?
                 `/inboxes/messages`,
                 `/mails`,
                 `/emails`
             ];
             
             for (const path of candidates) {
                 console.log(`Checking ${path}...`);
                 const res = await request(path);
                 console.log(`  -> ${res.status}`);
                 if (res.status === 200) console.log("     Found:", res.body.substring(0, 100));
             }
        }
        
    } catch (e) {
        console.error(e);
    }
}

run();
