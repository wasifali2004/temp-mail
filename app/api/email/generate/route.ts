import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
        throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const address = data[0];
    return NextResponse.json({ address });
  } catch (error) {
    console.error("Error generating email:", error);
    return NextResponse.json({ error: 'Failed to generate email', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
