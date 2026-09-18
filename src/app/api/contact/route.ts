import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('RESEND_API_KEY is not defined in environment variables');
      return NextResponse.json(
        { success: false, message: 'Server configuration error: RESEND_API_KEY missing' },
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

    const toEmail = process.env.RESEND_TO_EMAIL || 'jawadiqbl3344@gmail.com';

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Inquiry <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: email,
        subject: `New Portfolio Inquiry: ${type} from ${name}`,
        text: `New message from ${name} (${email}):\n\nTopic: ${type}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #1e293b; margin-top: 0;">New Portfolio Inquiry</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Topic:</strong> ${type}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="margin: 8px 0;"><strong>Message:</strong></p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 6px; white-space: pre-wrap; color: #334155; line-height: 1.6;">${message}</div>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Sent from portfolio contact form at jawad-engineer.vercel.app</p>
          </div>
        `,
      }),
    });

    const data = await resendRes.json();

    if (!resendRes.ok) {
      console.error('Resend API error:', data);
      return NextResponse.json(
        { success: false, message: data.message || 'Failed to send message via Resend' },
        { status: resendRes.status }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing contact request' },
      { status: 500 }
    );
  }
}
