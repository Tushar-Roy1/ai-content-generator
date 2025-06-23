import { db } from '@/utils/db'
import { AIOutput, UserSubscription } from '@/utils/schema'
import { NextResponse } from 'next/server'
import { eq, desc, and, gte } from 'drizzle-orm'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    // Get user's subscription info
    const user = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email))

    const isPro = user[0]?.active === true
    const fromDate = new Date()

    // Set date range based on plan
    if (isPro) {
      fromDate.setFullYear(fromDate.getFullYear() - 1) // 1 year for Pro
    } else {
      fromDate.setMonth(fromDate.getMonth() - 1) // 1 month for Free
    }

    const history = await db
      .select()
      .from(AIOutput)
      .where(
        and(
          eq(AIOutput.createdBy, email),
          gte(AIOutput.createdAt, fromDate.toISOString())
        )
      )
      .orderBy(desc(AIOutput.createdAt))

    return NextResponse.json(history)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
