const https = require('https');

const API_KEY = 'bb2c37a9eamshd54ad8672fde226p13d6c9jsna8dba6a2fb7b';
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
