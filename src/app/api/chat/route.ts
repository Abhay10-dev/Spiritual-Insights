import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { apiRateLimiter } from '@/lib/rateLimit';

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  let message = '';
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const rateLimitResponse = apiRateLimiter.check(ip);
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await req.json();
    message = body.message;

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
  } catch (err: any) {
    console.error('[/api/chat] Error:', err);
    
    // Fallback AI Guide mechanism when Gemini API quota is exhausted
    const msgLower = message?.toLowerCase() || '';
    let fallbackReply = "The cosmic connection (API quota) is temporarily resting right now. However, remember that true peace comes from within. Take a deep breath and observe the present moment. 🙏";
    
    if (msgLower.includes('om') || msgLower.includes('shivaya')) {
      fallbackReply = "Om Namah Shivaya is one of the most powerful mantras in Hinduism. 'Om' represents the universe, 'Namah' means to bow or adore, and 'Shivaya' refers to Lord Shiva (inner consciousness). Chanting it brings deep peace to the mind and soul. 🙏";
    } else if (msgLower.includes('meditat')) {
      fallbackReply = "To meditate properly, find a quiet place and sit with a straight back. Close your eyes, relax your shoulders, and simply focus on the natural rhythm of your breath. When your mind wanders, gently bring it back to the breath without judgment. Even 5 minutes a day can transform your mind. 🧘‍♂️";
    } else if (msgLower.includes('ganesha')) {
      fallbackReply = "Lord Ganesha is the remover of obstacles and the deity of wisdom and beginnings. He is the son of Lord Shiva and Goddess Parvati. It is a tradition to pray to him before starting any new venture or journey to ensure success and smooth progress. 🐘";
    } else if (msgLower.includes('karma')) {
      fallbackReply = "Karma is the universal principle of cause and effect. Every action, word, and thought generates an energy that returns to us in the future. Good intentions and acts of kindness contribute to good karma and a peaceful existence. 🌸";
    } else if (msgLower.includes('peace') || msgLower.includes('mantra')) {
      fallbackReply = "The 'Om Shanti' mantra is a beautiful invocation for peace. 'Om' is the universal sound, and 'Shanti' means peace. Chanting 'Om Shanti Shanti Shanti' creates a vibration of profound peace in your mind, your surroundings, and the world. ✨";
    }
    
    // Return 200 with the fallback reply so the UI doesn't crash during presentations
    return NextResponse.json({ reply: fallbackReply });
  }
}
