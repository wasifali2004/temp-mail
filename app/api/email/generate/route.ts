import { NextResponse } from 'next/server';
import https from 'https';

export const dynamic = 'force-dynamic';

const API_KEY = process.env.RAPIDAPI_KEY;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const HOST = process.env.RAPIDAPI_HOST || 'tempmail-so.p.rapidapi.com';

if (!API_KEY || !AUTH_TOKEN) {
    throw new Error('Missing required environment variables: RAPIDAPI_KEY or AUTH_TOKEN');
}

function makeRequest(path: string, method: string = 'GET', body: any = null): Promise<any> {
    return new Promise((resolve, reject) => {
        const headers: any = {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': HOST,
            'Authorization': `Bearer ${AUTH_TOKEN}`
        };

        if (body) {
            headers['Content-Type'] = 'application/json';
        }

        const options = {
            hostname: HOST,
            path: path,
            method: method,
            headers: headers
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ status: res.statusCode, data: json });
                } catch {
                    resolve({ status: res.statusCode, raw: data });
                }
            });
        });
        
        req.on('error', (e) => {
            reject(e);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

export async function GET() {
    try {
        // 1. Get Domains
        const domainRes = await makeRequest('/domains');
        
        let domain = 'pixoledge.net'; // Primary fallback

        if (domainRes.status === 200 && domainRes.data && domainRes.data.code === 0 && Array.isArray(domainRes.data.data)) {
            const domainEntry = domainRes.data.data[0];
            domain = typeof domainEntry === 'string' ? domainEntry : (domainEntry.domain || domain);
        }

        const name = Math.random().toString(36).substring(2, 10);
        const emailAddress = `${name}@${domain}`;

        // 2. Create Inbox
        const createRes = await makeRequest('/inboxes', 'POST', {
            name: name,
            domain: domain,
            lifespan: 1800  // Free plan limit: max 1800 seconds (30 minutes)
        });

        // The API returns code: 0 for success
        if (createRes.data && createRes.data.code === 0) {
            return NextResponse.json({ address: emailAddress });
        } else {
            // Even if creation fails, if we have a success code from domains, it might have worked 
            // or the API is just being difficult. But we'll try to report the error properly.
            return NextResponse.json({ 
                error: 'API Error', 
                message: createRes.data?.message || 'Failed to create mailbox'
            }, { status: 500 });
        }

    } catch (error) {
        console.error("Generate Route Error:", error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
