const API_KEY = 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

async function test() {
    console.log("Testing exact route logic in terminal...");
    try {
        const domainsRes = await fetch(`https://${HOST}/domains`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': HOST,
                'Authorization': AUTH_TOKEN,
                'Accept': 'application/json'
            }
        });
        const data = await domainsRes.json();
        console.log("Status:", domainsRes.status);
        console.log("Body:", JSON.stringify(data));
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
