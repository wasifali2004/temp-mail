const https = require('https');

const API_KEY = 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

function test() {
    const options = {
        hostname: HOST,
        path: '/domains',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': HOST,
            'Authorization': AUTH_TOKEN
        }
    };

    console.log("SENDING HEADERS:", JSON.stringify(options.headers, null, 2));

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log("STATUS:", res.statusCode);
            console.log("BODY:", data);
        });
    });
    req.end();
}
test();
