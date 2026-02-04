const http = require('https');

const options = {
	method: 'POST',
	hostname: 'tempmail-so.p.rapidapi.com',
	port: null,
	path: '/inboxes',
	headers: {
		'x-rapidapi-key': 'd79537ee98msh607c1ede699196ap188f56jsn4f508083fd3e',
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
  name: 'testuser_' + Math.floor(Math.random() * 1000), // Randomize name slightly to avoid conflicts if any
  domain: 'example.com',
  lifespan: 1000 // Changing 0 to 1000 just in case 0 means "expire immediately"
}));
req.end();
