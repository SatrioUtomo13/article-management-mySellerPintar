'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Search } from "lucide-react"

import AlertDialogLogout from "@/widgets/alertDialog";

export default function ListArticles() {
    const [isOpen, setIsOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const router = useRouter()

    const handleLogout = () => {
        // localStorage.removeItem("token") // Hapus token
        // router.push("/login")            // Redirect ke login

        setOpenDialog(true)
    }

    const confirmLogout = () => {
        // Jalankan logika logout di sini
        console.log("Logging out...")
        setOpenDialog(false)

        // contoh redirect
        localStorage.removeItem("token") // Hapus token
        router.push("/login")
    }
    return (
        <section>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)} // klik luar untuk tutup
                />
            )}
            <header className="relative w-full min-h-screen bg-blue-600 text-white">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={"/jumbotron.jpg"}
                        alt="Hero Image"
                        fill
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-700/70 z-10" />
                </div>

                <div className="relative z-10">
                    <div className="p-4 flex justify-between bg-white sticky top-0">
                        <div className="flex space-x-2">
                            <Image
                                src={"/image.png"}
                                alt="Logo"
                                width={25}
                                height={22}
                            />
                            <h3 className="font-bold text-[#000150]">Logoipsum</h3>
                        </div>
                        <div>
                            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                                <DropdownMenuTrigger asChild>
                                    <div className="bg-blue-200 rounded-full h-8 w-8 flex items-center justify-center font-bold text-blue-600 cursor-pointer">
                                        J
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem>My Account</DropdownMenuItem>
                                    <div className="border-b border-gray-200" />
                                    <DropdownMenuItem className="text-red-500 hover:text-red-600" onClick={handleLogout}>
                                        <LogOut className="w-4 h-4 text-red-500 hover:text-red-600" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <AlertDialogLogout
                                open={openDialog}
                                onOpenChange={setOpenDialog}
                                onConfirm={confirmLogout}
                            />
                        </div>
                    </div>

                    <div className="min-h-screen px-4 flex flex-col items-center justify-center">
                        <div className="space-y-3 flex flex-col items-center justify-center">
                            <p className="text-sm font-medium">Blog genzet</p>
                            <h1 className="text-4xl md:text-4xl leading-tight text-center">The Journal : <br />
                                Design Resources, Interviews, and Industry News
                            </h1>
                            <p className="text-lg md:text-base mt-2">Your daily dose of design insights!</p>
                        </div>

                        <div className="mt-6 w-full max-w-md space-y-3 bg-blue-500 border-8 border-blue-500 rounded-md">
                            <Select>
                                <SelectTrigger className="bg-white text-gray-900 font-medium w-full data-[placeholder]:text-gray-900">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="ux">UX</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative text-slate-400">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                                <Input
                                    placeholder="Search articles"
                                    className="pl-8 bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </section>
    )
}
