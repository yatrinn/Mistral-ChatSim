import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
      const simulatedReply = \`Simulated reply for: "\${message}"\`;
      return NextResponse.json({ reply: simulatedReply });
    }
    const simulatedReply = \`Real API simulation: "\${message}"\`;
    return NextResponse.json({ reply: simulatedReply });
  } catch (error) {
    return NextResponse.error();
  }
}
