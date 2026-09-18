import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const accessKey = process.env.WEB3FORMS_KEY;

    if (!accessKey) {
      console.error('WEB3FORMS_KEY is not defined in environment variables');
      return NextResponse.json(
        { success: false, message: 'Server configuration error: WEB3FORMS_KEY missing' },
        { status: 500 }
      );
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const type = String(body.type || 'General');
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.set('access_key', accessKey);
    formData.set('name', name);
    formData.set('email', email);
    formData.set('subject', `Portfolio Inquiry: ${type} — ${name}`);
    formData.set('from_name', `${name} via Portfolio`);
    formData.set('message', message);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process contact request' },
      { status: 500 }
    );
  }
}
