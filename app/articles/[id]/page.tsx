'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from "next/navigation"

import Navbar from '@/app/components/Navbar'
import { handleLogout, confirmLogout } from "@/helpers/articleHelpers"
import { fetchArticleById } from '@/lib/api/axios'
import { useAppSelector } from '@/hooks'
import { Article } from '@/types/article'
import ArticleCard from '@/app/components/ArticleCard'
import Footer from '@/widgets/footer'

export default function page() {
    const router = useRouter()
    const { id } = useParams()
    const searchParams = useSearchParams()
    const categoryId = searchParams.get("categoryId")

    const [openDialog, setOpenDialog] = useState(false)
    const [article, setArticle] = useState<Article | null>(null);

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

    const filterArticle = articles
        .filter((article) => article.categoryId === categoryId)
        .slice(0, 3)
    console.log("artikel terpilih", filterArticle);


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
                    <span> Created by {article?.user.username}</span>
                </div>

                <main className='space-y-5'>
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

                <div className='mt-5 space-y-5'>
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
