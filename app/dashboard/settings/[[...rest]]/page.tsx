import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center bg-slate-200 p-5'>
      <UserProfile routing="hash" />
    </div>
  )
}

export default page
