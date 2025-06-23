'use client'
import React, { useEffect } from 'react'
import { FileClock, History, Home, Settings, WalletCards } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import TrackUsage from './TrackUsage'

function SideNav() {
    const MenueList = [
        {
            name: 'Home',
            logo: Home,
            path: '/dashboard'
        },
        {
            name: 'Billing',
            logo: WalletCards,
            path: '/dashboard/billing'
        },
        {
            name: 'History',
            logo: FileClock,
            path: '/dashboard/history'
        },
        {
            name: 'Settings',
            logo: Settings,
            path: '/dashboard/settings'
        },
    ]

    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        console.log(path)
    }, [path]);

    return (
        <div className='h-screen relative p-5 shadow-sm border bg-white'>
            <div className='flex justify-center'>
                <Image src={'/image.svg'} alt='logo' width={100} height={100} />
            </div>
            <div className='mt-5'>
                {MenueList.map((menue, index) => (
                    <div
                        key={menue.name || index}
                        className={`flex gap-2 mb-2 p-3 hover:bg-purple-500 hover:text-white rounded-lg cursor-pointer
                        ${path === menue.path && 'bg-purple-500 text-white'}`}
                        onClick={() => router.push(menue.path)}
                    >
                        <menue.logo className='' />
                        <h2>{menue.name}</h2>
                    </div>
                ))}
            </div>
            <div className='absolute bottom-10 left-1 w-full'>
                <TrackUsage />
            </div>
        </div>
    )
}

export default SideNav
