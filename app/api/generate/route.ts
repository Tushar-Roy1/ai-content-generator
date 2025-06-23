import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(req: Request) {
  try {
    const { prompt, inputs } = await req.json();

    // Customize prompt with inputs if needed, e.g.:
    // const finalPrompt = `${prompt} about ${inputs.niche || ''}`;
    // For now, just use the prompt directly
    const finalPrompt = prompt;

    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: finalPrompt }],
    });

    const generatedText = chatCompletion.choices[0]?.message?.content || 'No result';

    return NextResponse.json({ result: generatedText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
