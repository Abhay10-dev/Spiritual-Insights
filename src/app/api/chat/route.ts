import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { apiRateLimiter } from '@/lib/rateLimit';

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const rateLimitResponse = apiRateLimiter.check(ip);
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({
        reply: "The AI Guide is not configured yet. Please add your Gemini API key to .env.local as GEMINI_API_KEY=...",
      });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey as string });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `You are a knowledgeable, calm, and respectful AI Spiritual Guide specializing in Hindu spirituality, mythology, and philosophy. 

Your role is to:
- Explain mantras, their meaning and pronunciation
- Share stories from Hindu mythology (Ramayana, Mahabharata, Puranas)
- Guide users in meditation and mindfulness practices
- Explain festivals, rituals, and their spiritual significance
- Share moral teachings and wisdom from Bhagavad Gita, Upanishads, etc.
- Discuss concepts like karma, dharma, moksha in accessible language

Guidelines:
- Be respectful, non-preachy, and age-appropriate for all audiences
- If asked about other religions, respond with respect and inclusivity
- Keep answers concise (2-4 paragraphs max)
- Use 🙏 or relevant emojis naturally but sparingly
- Never promote superstition or pseudoscience
- If asked anything unrelated to spirituality, gently redirect`,
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (err) {
    console.error('[/api/chat] Error:', err);
    return NextResponse.json(
      { error: 'Internal server error', reply: 'Something went wrong. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
