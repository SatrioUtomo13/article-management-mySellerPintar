'use client'

import React from 'react'
import UserDropdown from '@/widgets/userDropdown'
import AlertDialogLogout from '@/widgets/alertDialog'

export default function NavbarAdmin(
    { name, onLogout, openDialog, setOpenDialog, onConfirmLogout }
        : { name: string, onLogout: () => void, openDialog: boolean, setOpenDialog: (openDialog: boolean) => void, onConfirmLogout: () => void }) {
    return (
        <div className="flex w-full justify-between items-center bg-white px-2 py-4">
            <span className="font-semibold">{name}</span>
            <div>
                <UserDropdown onLogout={onLogout} />
                <AlertDialogLogout
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                    onConfirm={onConfirmLogout}
                />
            </div>
        </div>
    )
}
