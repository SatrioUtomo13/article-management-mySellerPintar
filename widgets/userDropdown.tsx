'use client'

import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchUserProfile } from "@/lib/api/axios";

export default function userDropdown({ onLogout, isScroll }: { onLogout: () => void, isScroll: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState<string>("")
    const { token } = useAppSelector(state => state.auth);
    const router = useRouter()

    useEffect(() => {
        if (!token) return

        const getUser = async () => {
            try {
                const res = await fetchUserProfile(token)
                setUsername(res.username)

            } catch (error) {
                console.log(error);
            }
        }

        getUser()
    }, [token])

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div className="xl:flex xl:space-x-2 cursor-pointer">
                    <div className="bg-blue-200 rounded-full h-8 w-8 flex items-center justify-center font-bold text-blue-600">
                        {
                            username.slice(0, 1).toUpperCase()
                        }
                    </div>
                    <span className={`hidden xl:block underline ${isScroll ? 'text-slate-900' : 'text-white'}`}>{username}</span>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => router.push("/user/profile")}>My Account</DropdownMenuItem>
                <div className="border-b border-gray-200" />
                <DropdownMenuItem className="text-red-500" onClick={onLogout}>
                    <LogOut className="w-4 h-4 text-red-500" /> Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
