const http = require('https');

// Trying with the key currently in the .env file
const options = {
	method: 'POST',
	hostname: 'tempmail-so.p.rapidapi.com',
	port: null,
	path: '/inboxes',
	headers: {
		'x-rapidapi-key': 'bb2c37a9eamshd54ad8672fde226p13d6c9jsna8dba6a2fb7b', // Key from previous .env view
		'x-rapidapi-host': 'tempmail-so.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log('STATUS:', res.statusCode);
		console.log('BODY:', body.toString());
	});
});

req.write(JSON.stringify({
  name: 'testuser_' + Math.floor(Math.random() * 1000), 
  domain: 'example.com',
  lifespan: 1000 
}));
req.end();
