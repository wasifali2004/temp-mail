const http = require('http');
const https = require('https');

const API_KEY = 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const RAPID_API_HOST = 'tempmail-so.p.rapidapi.com';

const server = http.createServer((req, res) => {
    console.log(`Proxying request: ${req.url}`);
    
    const options = {
        hostname: RAPID_API_HOST,
        path: req.url,
        method: req.method,
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': RAPID_API_HOST,
            'Authorization': AUTH_TOKEN,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });

    req.pipe(proxyReq);
});

server.listen(3008, () => {
    console.log('Proxy server running on port 3008');
});
