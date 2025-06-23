import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { UserSubscription } from '@/utils/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, userName, paymentId } = body;

    const now = new Date().toISOString();

    // Check if the user already has a subscription
    const existing = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));

    if (existing.length > 0) {
      // Update existing subscription
      await db
        .update(UserSubscription)
        .set({
          active: true,
          paymentId,
          joinDate: now,
          plan: 'pro', // ✅ set plan to "pro"
        })
        .where(eq(UserSubscription.email, email));
    } else {
      // Insert new subscription
      await db.insert(UserSubscription).values({
        email,
        userName,
        active: true,
        paymentId,
        joinDate: now,
        plan: 'pro', // ✅ set plan to "pro"
      });
    }

    return new Response(JSON.stringify({ status: 'success' }), { status: 200 });
  } catch (err: any) {
    console.error('Error saving subscription:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
