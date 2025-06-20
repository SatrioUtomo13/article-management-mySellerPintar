'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from "next/navigation"
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

import Navbar from '@/app/components/Navbar'
import { handleLogout, confirmLogout } from "@/helpers/articleHelpers"
import { fetchArticleById } from '@/lib/api/axios'
import { useAppSelector } from '@/hooks'
import { Article } from '@/types/article'
import ArticleCard from '@/app/components/ArticleCard'
import Footer from '@/widgets/footer'
import UserDropdown from '@/widgets/userDropdown'
import AlertDialogLogout from '@/widgets/alertDialog'
import { fetchUserProfile } from "@/lib/api/axios";


export default function page() {
    const router = useRouter()
    const { id } = useParams()
    const searchParams = useSearchParams()
    const categoryId = searchParams.get("categoryId")

    const [openDialog, setOpenDialog] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [article, setArticle] = useState<Article | null>(null);
    const [username, setUsername] = useState<string>("")

    const { token } = useAppSelector(state => state.auth)
    const { articles } = useAppSelector(state => state.article)

    const onLogout = () => handleLogout(setOpenDialog)
    const onConfirmLogout = () => confirmLogout(setOpenDialog, router)

    useEffect(() => {
        if (!token || !id) return
        const getArticle = async () => {
            try {
                const res = await fetchArticleById(token, id as string)
                setArticle(res)
            } catch (error) {
                console.error("Error fetching article", error)
            }
        }

        getArticle()
    }, [token, id])

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

    const filterArticle = articles
        .filter((article) => article.categoryId === categoryId)
        .slice(0, 3)
    console.log("artikel terpilih", filterArticle);


    return (
        <section>
            <div className='relative z-10'>
                <div className={`p-4 flex justify-between z-20 sticky top-0 xl:px-10 transition-colors duration-300 bg-white`}>
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
                </div>
            </div>

            <div className='flex flex-col px-5'>
                <div className='mx-auto'>
                    <span>
                        {article?.createdAt && (() => {
                            const date = new Date(article.createdAt)
                            const day = date.getDate()
                            const month = date.toLocaleString("id-ID", { month: "long" })
                            const year = date.getFullYear()
                            return `${month} ${day}, ${year}`
                        })()}
                    </span> •
                    <span> Created by {article?.user.username}</span>
                </div>

                <main className='space-y-5 xl:max-w-3xl xl:mx-auto'>
                    <h1 className='text-center font-bold text-slate-900 text-2xl'>{article?.title}</h1>

                    <img
                        src={article?.imageUrl}
                        alt={article?.title}
                        className="w-full h-48 object-cover rounded-xl"
                    />

                    <p className="text-slate-700 line-clamp-2">
                        {article?.content}
                    </p>
                </main>

                <div className='mt-5 space-y-5 xl:max-w-3xl xl:mx-auto'>
                    <h4 className='text-slate-900 font-semibold text-lg'>Ohter articles</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
                        {filterArticle && filterArticle.length > 0 ? (
                            filterArticle.map((article) => <ArticleCard key={article.id} article={article} />)
                        ) : (
                            <p>No article found</p>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

        </section>
    )
}
