const http = require('http');

async function testLocalApi(path) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'GET'
        };

        console.log(`Testing locale API: ${path}`);
        const req = http.get(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`Status: ${res.statusCode}`);
                console.log(`Body: ${data}`);
                resolve({ status: res.statusCode, body: data });
            });
        });

        req.on('error', (e) => {
            console.error(`Error: ${e.message}`);
            resolve({ status: 500, error: e.message });
        });
    });
}

async function run() {
    console.log("Starting local API test...");
    const genRes = await testLocalApi('/api/email/generate');
    
    if (genRes.status === 200) {
        const data = JSON.parse(genRes.body);
        if (data.address) {
            console.log(`Generated Address: ${data.address}`);
            console.log("\nTesting messages for this address...");
            await testLocalApi(`/api/email/messages?address=${data.address}`);
        }
    }
}

run();
