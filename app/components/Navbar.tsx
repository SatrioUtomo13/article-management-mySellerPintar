'use client'

import React from 'react'
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
    return (
        <div className="p-4 flex justify-between z-20 bg-white sticky top-0 xl:bg-transparent xl:px-10">
            <div className="flex space-x-2">
                <Image
                    src={"/image.png"}
                    alt="Logo"
                    width={25}
                    height={22}
                    className="xl:hidden"
                />
                <Image
                    src={"/image-white.png"}
                    alt="Logo"
                    width={25}
                    height={22}
                    className="hidden xl:block"
                />
                <h3 className="font-bold text-[#000150] xl:text-white">Logoipsum</h3>
            </div>
            <div>
                <UserDropdown onLogout={onLogout} />

                <AlertDialogLogout
                    open={open}
                    onOpenChange={onOpenChange}
                    onConfirm={onConfirm}
                />
            </div>
        </div>
    )
}
