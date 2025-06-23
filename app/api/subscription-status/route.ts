// /app/api/subscription-status/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/utils/db' 
import { eq } from 'drizzle-orm'
import { UserSubscription } from '@/utils/schema' 

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const [user] = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email))

    const isPro = user?.active ?? false
    const joinDate = user?.joinDate ?? null

    return NextResponse.json({ isPro, joinDate })
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
