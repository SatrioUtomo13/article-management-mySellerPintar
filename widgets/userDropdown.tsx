'use client'

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

export default function userDropdown({ onLogout }: { onLogout: () => void }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div className="xl:flex xl:space-x-2 cursor-pointer">
                    <div className="bg-blue-200 rounded-full h-8 w-8 flex items-center justify-center font-bold text-blue-600">
                        J
                    </div>
                    <span className="hidden xl:block underline">James Dean</span>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <div className="border-b border-gray-200" />
                <DropdownMenuItem className="text-red-500" onClick={onLogout}>
                    <LogOut className="w-4 h-4 text-red-500" /> Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
