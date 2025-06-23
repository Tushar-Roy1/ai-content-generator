'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const TrackUsage = () => {
  const { user } = useUser()
  const [totalUsage, setTotalUsage] = useState<number>(0)
  const [maxCredits, setMaxCredits] = useState<number>(10000) // Default for Free Plan

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress
    if (email) {
      fetchUsage(email)
      fetchPlan(email)
    }
  }, [user])

  const fetchUsage = async (email: string) => {
    try {
      const res = await fetch(`/api/usage?email=${email}`)
      const { data } = await res.json()
      const total = data.reduce(
        (acc: number, item: any) => acc + (item.aiResponse?.length || 0),
        0
      )
      setTotalUsage(total)
    } catch (err) {
      console.error('Failed to fetch usage:', err)
    }
  }

  const fetchPlan = async (email: string) => {
    try {
      const res = await fetch(`/api/subscription-status?email=${email}`)
      const { isPro } = await res.json()
      setMaxCredits(isPro ? 100000 : 10000)
    } catch (err) {
      console.error('Failed to fetch subscription plan:', err)
    }
  }

  const percentage = Math.min((totalUsage / maxCredits) * 100, 100)

  return (
    <div className='m-2'>
      <div className='bg-purple-700 text-white p-3 rounded-lg'>
        <h2>Credits</h2>
        <div className='h-2 bg-purple-400 w-full rounded-full mt-3'>
          <div
            className='h-2 bg-white rounded-full'
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <h2 className='text-sm my-2'>
          {totalUsage}/{maxCredits.toLocaleString()} Credit Used
        </h2>
      </div>

      <Link href="/dashboard/billing" passHref>
        <Button variant="secondary" className="w-full text-purple-600 my-3 border cursor-pointer">
          Upgrade
        </Button>
      </Link>
    </div>
  )
}

export default TrackUsage
