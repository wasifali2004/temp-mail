const API_KEY = process.env.RAPID_API || 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

async function run() {
    console.log("Testing with FETCH Tweaked...");
    try {
        const res = await fetch(`https://${HOST}/domains`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': HOST,
                'Authorization': AUTH_TOKEN,
                'Accept': 'application/json',
                'User-Agent': 'Node.js/18'
            }
        });
        
        console.log(`Status: ${res.status}`);
        const text = await res.text();
        console.log(`Body: ${text.substring(0, 200)}`);
        
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

run();
