const https = require('https');

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
    console.log("=".repeat(60));
    console.log("TESTING COMPLETE TEMP MAIL FLOW");
    console.log("=".repeat(60));
    
    try {
        // Step 1: Get Domains
        console.log("\n[STEP 1] Fetching available domains...");
        const domainRes = await makeRequest('/domains');
        
        if (domainRes.status !== 200) {
            console.error("❌ FAILED to get domains");
            console.error("Status:", domainRes.status);
            console.error("Response:", JSON.stringify(domainRes.data || domainRes.raw));
            return;
        }
        
        console.log("✅ SUCCESS - Domains fetched");
        
        // Parse domains
        let domains = [];
        const json = domainRes.data;
        if (Array.isArray(json)) {
            domains = json;
        } else if (json && json.data && Array.isArray(json.data)) {
            domains = json.data;
        } else if (json && json.domains && Array.isArray(json.domains)) {
            domains = json.domains;
        }
        
        if (domains.length === 0) {
            console.error("❌ No domains found in response");
            console.error("Response structure:", JSON.stringify(json, null, 2));
            return;
        }
        
        let domainStr = domains[0];
        if (typeof domainStr === 'object' && domainStr.domain) {
            domainStr = domainStr.domain;
        }
        
        console.log(`   Available domains: ${domains.length}`);
        console.log(`   Using domain: ${domainStr}`);
        
        // Step 2: Create Inbox
        const name = `test_${Math.floor(Math.random() * 10000)}`;
        const email = `${name}@${domainStr}`;
        
        console.log(`\n[STEP 2] Creating inbox: ${email}`);
        const inboxRes = await makeRequest('/inboxes', 'POST', {
            name: name,
            domain: domainStr,
            lifespan: 1000
        });
        
        if (inboxRes.status !== 200 && inboxRes.status !== 201) {
            console.error("❌ FAILED to create inbox");
            console.error("Status:", inboxRes.status);
            console.error("Response:", JSON.stringify(inboxRes.data || inboxRes.raw));
            return;
        }
        
        console.log("✅ SUCCESS - Inbox created");
        console.log(`   Email address: ${email}`);
        
        // Step 3: Check Messages (should be empty initially)
        console.log(`\n[STEP 3] Checking messages for ${email}...`);
        const msgRes = await makeRequest(`/messages?name=${name}&domain=${domainStr}`);
        
        if (msgRes.status !== 200) {
            console.error("❌ FAILED to fetch messages");
            console.error("Status:", msgRes.status);
            console.error("Response:", JSON.stringify(msgRes.data || msgRes.raw));
            return;
        }
        
        console.log("✅ SUCCESS - Messages endpoint working");
        
        // Parse messages
        let messages = [];
        const msgData = msgRes.data;
        if (Array.isArray(msgData)) {
            messages = msgData;
        } else if (msgData && msgData.data && Array.isArray(msgData.data)) {
            messages = msgData.data;
        } else if (msgData && msgData.messages && Array.isArray(msgData.messages)) {
            messages = msgData.messages;
        }
        
        console.log(`   Messages found: ${messages.length}`);
        
        if (messages.length > 0) {
            console.log("\n   Recent messages:");
            messages.slice(0, 3).forEach((msg, i) => {
                console.log(`   ${i + 1}. From: ${msg.from || 'Unknown'}`);
                console.log(`      Subject: ${msg.subject || '(No subject)'}`);
            });
        } else {
            console.log("   (Inbox is empty - this is expected for a new email)");
        }
        
        // Summary
        console.log("\n" + "=".repeat(60));
        console.log("✅ ALL TESTS PASSED!");
        console.log("=".repeat(60));
        console.log("\nYour application is now configured correctly:");
        console.log(`  ✓ RapidAPI authentication working`);
        console.log(`  ✓ Email generation working (domain: ${domainStr})`);
        console.log(`  ✓ Message fetching working`);
        console.log(`\nThe temp mail app should now work in your browser!`);
        console.log(`Visit: http://localhost:3000`);
        
    } catch (error) {
        console.error("\n❌ ERROR:", error.message);
        console.error("\nStack:", error.stack);
    }
}

run();
