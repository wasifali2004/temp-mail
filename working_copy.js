const API_KEY = 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

async function testFetch() {
    console.log("Testing with fetch...");
    const res = await fetch(`https://${HOST}/domains`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': HOST,
            'Authorization': AUTH_TOKEN,
            'Content-Type': 'application/json'
        }
    });
    
    console.log(`Status: ${res.status}`);
    const data = await res.text();
    console.log(`Body: ${data}`);
}

testFetch();
