import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';

export async function POST(req: Request) {
  try {
   const body = await req.json();
const { aiResponse, formData, templateSlug, createdBy } = body;

if (!createdBy) {
  return NextResponse.json({ error: 'Email is required' }, { status: 400 });
}

await db.insert(AIOutput).values({
  aiResponse,
  formData,
  templateSlug,
  createdBy,
  createdAt: new Date().toISOString(),
});


    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
