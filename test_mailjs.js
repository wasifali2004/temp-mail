const Mailjs = require('@cemalgnlts/mailjs');
const mailjs = new Mailjs();

async function run() {
    console.log("Testing mailjs...");
    try {
        const acc = await mailjs.create();
        console.log("Account created:", acc.data.address);
        
        console.log("Waiting for messages...");
        const msgs = await mailjs.getMessages();
        console.log("Messages:", msgs.data.length);
    } catch (e) {
        console.error("Mailjs error:", e);
    }
}

run();
