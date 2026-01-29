import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  const [login, domain] = address.split('@');

  if (!login || !domain) {
     return NextResponse.json({ error: 'Invalid address format' }, { status: 400 });
  }

  try {
    // 1. Get list of messages
    const listRes = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!listRes.ok) {
        throw new Error('Failed to fetch message list');
    }
    
    const messages = await listRes.json();

    // 2. Fetch full content for each message (to get body/OTP)
    // We can limit this to the latest 10 messages to avoid too many requests
    const fullMessages = await Promise.all(
      messages.slice(0, 10).map(async (msg: any) => {
        const fullRes = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${msg.id}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        const fullMsg = await fullRes.json();
        
        // Map to our frontend interface
        return {
          id: String(fullMsg.id),
          from: { address: fullMsg.from, name: fullMsg.from },
          to: [{ address: address, name: '' }],
          subject: fullMsg.subject,
          intro: fullMsg.textBody?.substring(0, 100) || '',
          text: fullMsg.textBody || fullMsg.body, // Prefer textBody for OTP extraction
          createdAt: fullMsg.date, 
        };
      })
    );

    return NextResponse.json(fullMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: 'Failed to fetch messages', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
