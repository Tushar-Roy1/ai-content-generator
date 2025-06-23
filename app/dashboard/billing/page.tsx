'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs'; // ✅ Clerk hook

const plans = [
  {
    title: 'Free Plan',
    price: '₹0/month',
    features: [
      '10,000 words/month content generation',
      '50+ content templates',
      'Unlimited download and copy',
      '1 month of history',
    ],
    isFree: true,
  },
  {
    title: 'Pro Plan',
    price: '₹99/month',
    features: [
      '100,000 words/month content generation',
      '50+ content templates',
      'Unlimited download and copy',
      '1 year of history',
    ],
    isFree: false,
  },
];

const BillingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser(); // ✅ get user from Clerk
  const [currentPlan, setCurrentPlan] = useState<'Free' | 'Pro'>('Free');
  const [daysLeft, setDaysLeft] = useState<number | null>(null);


  const email = user?.primaryEmailAddress?.emailAddress || '';
  const userName = user?.fullName || 'Guest';

useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  script.onload = () => console.log('Razorpay script loaded'); // debug
  script.onerror = () => console.error('Failed to load Razorpay script');
  document.body.appendChild(script);
  const email = user?.primaryEmailAddress?.emailAddress;
  if (email) {
    fetchPlan(email);
  }
}, [user]);


const fetchPlan = async (email: string) => {
  try {
    const res = await fetch(`/api/subscription-status?email=${email}`);
    const { isPro, joinDate } = await res.json();

    setCurrentPlan(isPro ? 'Pro' : 'Free');

    if (isPro && joinDate) {
      const start = new Date(joinDate);
      const now = new Date();
      const diffTime = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
      const end = new Date(start.getTime() + diffTime);
      const remaining = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      setDaysLeft(remaining > 0 ? remaining : 0);
    }
  } catch (err) {
    console.error('Failed to fetch current plan:', err);
  }
};



  const handleSubscribe = async () => {
    try {
      setIsLoading(true);

      const res = await fetch('/api/create-subscription', {
        method: 'POST',
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        subscription_id: data.id,
        name: 'Content App Pro Plan',
        description: '₹99/month subscription',
        handler: async function (response: any) {
          alert('Subscription successful!');
          console.log('Razorpay Response:', response);

          // ✅ Send dynamic user info to backend
          await fetch('/api/save-subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              userName,
              paymentId: response.razorpay_payment_id,
            }),
          });
        },
        prefill: {
          name: userName,
          email,
        },
        theme: {
          color: '#9333ea',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

      setIsLoading(false);
    } catch (err) {
      console.error('Subscription error:', err);
      alert('Failed to create subscription. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-100 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Upgrade with a Monthly Plan
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Choose the perfect plan to enhance your content creation experience.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-2 text-center">
                {plan.title}
              </h3>
              <p className="text-xl font-bold text-gray-800 mb-6 text-center">
                {plan.price}
              </p>
              <ul className="text-gray-700 list-disc list-inside space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="mt-auto text-center">
  {(plan.isFree && currentPlan === 'Free') || (!plan.isFree && currentPlan === 'Pro') ? (
    <>
      <button className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg cursor-default" disabled>
        💎 Active Plan
      </button>
      {plan.title === 'Pro Plan' && daysLeft !== null && (
        <p className="text-sm text-gray-500 mt-2">🕒 {daysLeft} day(s) remaining</p>
      )}
    </>
  ) : plan.isFree && currentPlan === 'Pro' ? (
    <button
      className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
      disabled
    >
      💎 Active Plan
    </button>
  ) : (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      className={`w-full py-2 px-4 rounded-lg transition-colors cursor-pointer ${
        isLoading
          ? 'bg-purple-400 cursor-not-allowed'
          : 'bg-purple-600 hover:bg-purple-700 text-white'
      }`}
    >
      {isLoading ? 'Loading...' : 'Subscribe Now'}
    </button>
  )}
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingPage;
