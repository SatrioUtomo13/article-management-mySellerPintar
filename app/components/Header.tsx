'use client'

import React from 'react'
import { useState } from "react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

export default function Header() {
    return (
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
    )
}
