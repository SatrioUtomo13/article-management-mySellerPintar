'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import UserDropdown from '@/widgets/userDropdown'
import AlertDialogLogout from '@/widgets/alertDialog'

export default function Navbar({
    onLogout,
    open,
    onOpenChange,
    onConfirm
}: {
    onLogout: () => void,
    open: boolean,
    onOpenChange: (open: boolean) => void,
    onConfirm: () => void
}) {
    const [isScroll, setIsScroll] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <div className={`p-4 flex justify-between z-20 sticky top-0 xl:px-10 transition-colors duration-300 ${isScroll ? 'bg-white' : 'bg-white xl:bg-transparent'}`}>
            <div className="flex space-x-2">
                <Image
                    src={"/image.png"}
                    alt="Logo"
                    width={25}
                    height={22}
                    className={` ${isScroll ? 'block' : 'xl:hidden'}`}
                />
                <Image
                    src={"/image-white.png"}
                    alt="Logo"
                    width={25}
                    height={22}
                    className={`${isScroll ? 'hidden' : 'xl:block'}`}
                />
                <h3 className={`font-bold ${isScroll ? 'text-[#000150]' : 'xl:text-white'}`}>Logoipsum</h3>
            </div>
            <div>
                <UserDropdown onLogout={onLogout} isScroll={isScroll} />

                <AlertDialogLogout
                    open={open}
                    onOpenChange={onOpenChange}
                    onConfirm={onConfirm}
                />
            </div>
        </div>
    )
}
