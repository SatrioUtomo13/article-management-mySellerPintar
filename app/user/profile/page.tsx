'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

import AlertDialogLogout from '@/widgets/alertDialog'
import { handleLogout, confirmLogout } from "@/helpers/articleHelpers"
import { useAppSelector } from '@/hooks'
import { fetchUserProfile } from "@/lib/api/axios";
import Footer from '@/widgets/footer'

export default function page() {
    const [isOpen, setIsOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const { token } = useAppSelector(state => state.auth)

    const router = useRouter()
    const onConfirmLogout = () => confirmLogout(setOpenDialog, router)
    const onLogout = () => handleLogout(setOpenDialog)

    useEffect(() => {
        if (!token) return

        const getUser = async () => {
            try {
                const res = await fetchUserProfile(token)

                setUsername(res.username)
                setPassword(localStorage.getItem("password") || "")
                setRole(res.role)
            } catch (error) {
                console.log(error);
            }
        }

        getUser()
    }, [token])

    return (
        <section className='min-h-screen flex flex-col'>
            <header className='p-4 flex justify-between z-20 sticky top-0 xl:px-10 transition-colors duration-300 bg-white border-b '>
                <div className="flex space-x-2">
                    <Image
                        src={"/image.png"}
                        alt="Logo"
                        width={25}
                        height={22}
                    />
                    <h3 className={`font-bold text-[#000150]`}>Logoipsum</h3>
                </div>

                <div>
                    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger asChild>
                            <div className="xl:flex xl:space-x-2 cursor-pointer">
                                <div className="bg-blue-200 rounded-full h-8 w-8 flex items-center justify-center font-bold text-blue-600">
                                    {
                                        username.slice(0, 1).toUpperCase()
                                    }
                                </div>
                                <span className={`hidden xl:block underline text-slate-900}`}>{username}</span>
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

                    <AlertDialogLogout
                        open={openDialog}
                        onOpenChange={setOpenDialog}
                        onConfirm={onConfirmLogout}
                    />
                </div>
            </header>

            <main className='flex flex-col space-y-5 flex-grow items-center justify-center'>
                <h4 className='text-slate-900 text-xl font-bold'>User Profile</h4>
                <div className="bg-blue-200 rounded-full h-16 w-16 flex items-center justify-center font-bold text-blue-600">
                    {
                        username.slice(0, 1).toUpperCase()
                    }
                </div>

                <table className="border-separate border-spacing-y-3 w-[80%] md:w-1/2 lg:w-1/4">
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                <div className="bg-gray-100 rounded-sm px-4 py-2 flex items-center border border-slate-200">
                                    <div className="w-1/3 font-medium">Username</div>
                                    <div className="mx-2">:</div>
                                    <div className="flex-1">{username}</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div className="bg-gray-100 rounded-sm px-4 py-2 flex items-center border border-slate-200">
                                    <div className="w-1/3 font-medium">Password</div>
                                    <div className="mx-2">:</div>
                                    <div className="flex-1">{password}</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div className="bg-gray-100 rounded-sm px-4 py-2 flex items-center border border-slate-200">
                                    <div className="w-1/3 font-medium">Role</div>
                                    <div className="mx-2">:</div>
                                    <div className="flex-1">{role}</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Button className='bg-blue-600 hover:bg-blue-700 w-[80%] md:w-1/2 lg:w-1/4' onClick={() => router.back()}>Back to home</Button>

            </main>

            <Footer />
        </section>
    )
}
