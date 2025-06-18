'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from "next/navigation"

import Navbar from '@/app/components/Navbar'
import Footer from '@/widgets/footer'
import { Article } from '@/types/article'
import { handleLogout, confirmLogout } from "@/helpers/articleHelpers"

export default function page() {
    const router = useRouter()

    const [article, setArticle] = useState<Article | null>(null)
    const [openDialog, setOpenDialog] = useState(false)


    const onLogout = () => handleLogout(setOpenDialog)
    const onConfirmLogout = () => confirmLogout(setOpenDialog, router)

    useEffect(() => {
        const previewData = localStorage.getItem("previewArticle")
        if (previewData) {
            setArticle(JSON.parse(previewData))
        }
    }, [])

    console.log("ini article", article);

    return (
        <section>
            <div className='relative z-10'>
                <Navbar
                    onLogout={onLogout}
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                    onConfirm={onConfirmLogout}
                />
            </div>

            <div className='flex flex-col px-5'>
                <div>
                    <span>
                        {article?.createdAt && (() => {
                            const date = new Date(article.createdAt)
                            const day = date.getDate()
                            const month = date.toLocaleString("id-ID", { month: "long" })
                            const year = date.getFullYear()
                            return `${month} ${day}, ${year}`
                        })()}
                    </span> •
                    <span> Created by {article?.user?.username || "You"}</span>
                </div>

                <main className='space-y-5'>
                    <h1 className='text-center font-bold text-slate-900 text-2xl'>{article?.title}</h1>

                    {article?.imageUrl && (
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-48 object-cover rounded-xl"
                        />
                    )}

                    <div
                        className="text-slate-700 prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: article?.content || "" }}
                    />
                </main>
            </div>

            <Footer />
        </section>
    )
}
