'use client'

import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerHeader
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Newspaper, Tag, LogOut, Search } from "lucide-react";
import Link from "next/link"

import Logo from '@/widgets/Logo'

export default function AdminLayout({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    return (
        <>
            {/* Sidebar */}
            <Drawer open={open} onOpenChange={setOpen} direction="left">
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-50 lg:hidden">
                        <Menu className="w-6 h-6" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="p-4 pt-10 flex flex-col gap-2 bg-blue-600 text-white lg:hidden">
                    <Logo
                        bodyClassName="flex space-x-2"
                        textClassName="text-white font-semibold text-2xl"
                    />
                    <DrawerHeader>
                        <DrawerTitle className=" text-blue-600 text-xs">.</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex space-x-2 hover:bg-blue-500 px-3 py-2 rounded-sm">
                        <Newspaper className="w-5 h-5" />
                        <Link href="/admin/dashboard">Articles</Link>
                    </div>
                    <div className="flex space-x-2 hover:bg-blue-500 px-3 py-2 rounded-sm">
                        <Tag className="w-5 h-5" />
                        <Link href="/admin/category">Category</Link>
                    </div>
                    <div className="flex space-x-2 hover:bg-blue-500 px-3 py-2 rounded-sm">
                        <LogOut className="w-5 h-5" />
                        <Link href="/logout">Logout</Link>
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Permanent Sidebar on lg+ */}
            <aside className="hidden lg:flex lg:fixed lg:top-0 lg:left-0 lg:h-screen w-64 bg-blue-600 text-white p-6 flex-col">
                <Logo
                    bodyClassName="flex space-x-2"
                    textClassName="text-white font-semibold text-2xl"
                />
                <nav className="space-y-4 mt-5">
                    <div className="flex space-x-2 hover:bg-blue-500 px-3 py-2 rounded-sm">
                        <Newspaper className="w-5 h-5" />
                        <Link href="/admin/dashboard">Articles</Link>
                    </div>
                    <div className="flex space-x-2 hover:bg-blue-500 px-3 py-2 rounded-sm">
                        <Tag className="w-5 h-5" />
                        <Link href="/admin/category">Category</Link>
                    </div>
                    <div className="flex space-x-2 hover:bg-blue-500 px-3 py-2 rounded-sm">
                        <LogOut className="w-5 h-5" />
                        <Link href="/logout">Logout</Link>
                    </div>
                </nav>
            </aside>
        </>
    )
}
