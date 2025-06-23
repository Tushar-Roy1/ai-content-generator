// /app/api/create-subscription/route.js

import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST() {
  const plan_id = process.env.RAZORPAY_SUBSCRIPTION_ID;

  if (!plan_id) {
    return new Response(
      JSON.stringify({ error: 'Razorpay plan ID is missing' }),
      { status: 400 }
    );
  }

  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id,
      total_count: 12,
      customer_notify: 1,
    });

    return new Response(JSON.stringify(subscription), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[Razorpay Subscription Error]', err);
    return new Response(
      JSON.stringify({ error: 'Failed to create subscription' }),
      { status: 500 }
    );
  }
}
