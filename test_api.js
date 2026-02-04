const https = require('https');

const options = {
  hostname: 'tempmail-so.p.rapidapi.com',
  path: '/domains',
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'bb2c37a9eamshd54ad8672fde226p13d6c9jsna8dba6a2fb7b',
    'X-RapidAPI-Host': 'tempmail-so.p.rapidapi.com',
    'Authorization': 'FD3789BB-7DA7-3A83-6FA4-329729667B9B'
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('DOMAINS RESPONSE:', data);
    
    // Now try to create an email
    const createData = JSON.stringify({
        "name": "testuser",
        "domain": "example.com",
        "lifespan": 0
    });
    
    const createOptions = {
        hostname: 'tempmail-so.p.rapidapi.com',
        path: '/', 
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': 'bb2c37a9eamshd54ad8672fde226p13d6c9jsna8dba6a2fb7b',
            'X-RapidAPI-Host': 'tempmail-so.p.rapidapi.com',
            'Authorization': 'FD3789BB-7DA7-3A83-6FA4-329729667B9B',
            'Content-Type': 'application/json',
            'Content-Length': createData.length
        }
    };

    const createReq = https.request(createOptions, (res2) => {
        console.log(`CREATE STATUS: ${res2.statusCode}`);
        let data2 = '';
        res2.on('data', (chunk) => { data2 += chunk; });
        res2.on('end', () => {
            console.log('CREATE RESPONSE:', data2);
        });
    });
    
    createReq.write(createData);
    createReq.end();
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
