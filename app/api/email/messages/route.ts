import { NextResponse } from 'next/server';
import https from 'https';

export const dynamic = 'force-dynamic';

const API_KEY = 'be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152';
const AUTH_TOKEN = 'FD3789BB-7DA7-3A83-6FA4-329729667B9B';
const HOST = 'tempmail-so.p.rapidapi.com';

function makeRequest(path: string, method: string = 'GET'): Promise<any> {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: HOST,
            path: path,
            method: method,
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': HOST,
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ status: res.statusCode, data: json });
                } catch (e) {
                    resolve({ status: res.statusCode, raw: data });
                }
            });
        });
        
        req.on('error', reject);
        req.end();
    });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address || !address.includes('@')) {
        return NextResponse.json({ error: 'Valid address required' }, { status: 400 });
    }

    const [name, domain] = address.split('@');

    try {
        const msgRes = await makeRequest(`/messages?name=${name}&domain=${domain}`);
        
        if (msgRes.status === 200 && (msgRes.data.code === 0 || Array.isArray(msgRes.data))) {
            const rawMessages = Array.isArray(msgRes.data) ? msgRes.data : (msgRes.data.data || []);
            
            const mappedMessages = rawMessages.map((msg: any) => ({
                id: String(msg.id || Math.random().toString(36)),
                from: { 
                    address: msg.from || 'sender@example.com', 
                    name: msg.fromName || 'Unknown Sender' 
                },
                subject: msg.subject || 'No Subject',
                text: msg.body || msg.textBody || '',
                intro: (msg.body || msg.textBody || '').substring(0, 100),
                createdAt: msg.date || new Date().toISOString()
            }));

            return NextResponse.json(mappedMessages);
        } else {
            return NextResponse.json({ 
                error: 'API Error', 
                message: msgRes.data?.message || 'Failed to fetch messages'
            }, { status: msgRes.status });
        }
    } catch (error) {
        console.error("Messages Route Error:", error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
