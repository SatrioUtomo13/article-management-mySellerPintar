'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setArticles } from "@/store/articleSlice";
import { setCategories } from "@/store/categorySlice"

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import PaginationControl from "@/widgets/PaginationControl"
import Footer from "@/widgets/footer"
import { fetchArticles, fetchCategories } from "@/lib/api/axios";
import { Category } from "@/types/article"

export default function ListArticles() {
    const { articles, page, total, limit } = useAppSelector(state => state.article);
    const { categories } = useAppSelector(state => state.category);
    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [token, setToken] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string | null>(null)

    const router = useRouter()

    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    useEffect(() => {
        if (!token) return;

        const getDataArticles = async () => {
            try {
                const res = await fetchArticles(token, currentPage);
                dispatch(setArticles(res));
            } catch (error) {
                console.log(error);
            }
        };

        getDataArticles();
    }, [token, currentPage]);


    useEffect(() => {
        if (!token) return;

        const getDataCategories = async () => {
            try {
                const res = await fetchCategories(token);
                dispatch(setCategories(res.data));
            } catch (error) {
                console.log(error);
            }
        };

        getDataCategories();
    }, [token])

    const handleLogout = () => {
        setOpenDialog(true)
    }

    const confirmLogout = () => {
        setOpenDialog(false)

        localStorage.removeItem("token") // Hapus token
        router.push("/login")
    }

    // const filteredArticles = selectedCategory ? articles.filter((article) => article.category?.name === selectedCategory) : articles

    const filteredArticles = (selectedCategory: string | null, searchQuery: string) => {
        if (selectedCategory) {
            return articles.filter((article) => article.category?.name === selectedCategory);
        } else if (searchQuery) {
            return articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()));
        } else {
            return articles;
        }
    }
    const filtered = filteredArticles(selectedCategory, searchQuery || "");

    // const totalPages = Math.ceil(filteredArticles.length / limit);

    return (
        <section>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)} // klik luar untuk tutup
                />
            )}
            <header className="relative w-full min-h-screen bg-blue-600 text-white">
                <Header />

                <div className="relative z-10">
                    <Navbar
                        onLogout={handleLogout}
                        open={openDialog}
                        onOpenChange={setOpenDialog}
                        onConfirm={confirmLogout}
                    />

                    <div className="min-h-screen px-4 flex flex-col items-center justify-center">
                        <div className="space-y-3 flex flex-col items-center justify-center">
                            <p className="text-sm font-medium">Blog genzet</p>
                            <h1 className="text-4xl md:text-4xl leading-tight text-center">The Journal : <br />
                                Design Resources, Interviews, and Industry News
                            </h1>
                            <p className="text-lg md:text-base mt-2">Your daily dose of design insights!</p>
                        </div>

                        <div className="mt-6 w-full max-w-md space-y-3 bg-blue-500 border-8 border-blue-500 rounded-md">
                            <Select onValueChange={(value) =>
                                setSelectedCategory(value === 'all' ? null : value)}>
                                <SelectTrigger className="bg-white text-gray-900 font-medium w-full data-[placeholder]:text-gray-900">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories
                                        .filter(category => category.id && category.name) // pastikan tidak undefined / kosong
                                        .map((category: Category) => (
                                            <SelectItem key={category.id} value={category.name}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <div className="relative text-slate-400">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                                <Input
                                    placeholder="Search articles"
                                    className="pl-8 bg-white"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4 mx-4">
                {filtered && filtered.length > 0 ? (
                    filtered.map((article) => <ArticleCard key={article.id} article={article} />)
                ) : (
                    <p>No article found</p>
                )}
            </main>

            <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <Footer />
        </section>
    )
}
