'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react";
import { useRouter } from "next/navigation"

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setArticles } from "@/store/articleSlice";
import { handleLogout, confirmLogout, filterArticles } from "@/helpers/articleHelpers"
import { fetchArticles, fetchCategories } from "@/lib/api/axios";
import PaginationControl from "@/widgets/PaginationControl"
import { setCategories } from "@/store/categorySlice"
import { Category } from "@/types/article"
import AdminLayout from "@/app/components/AdminLayout"
import NavbarAdmin from "@/app/components/NavbarAdmin"

export default function AdminDashboard() {
    const router = useRouter()

    const { articles, page, total, limit } = useAppSelector(state => state.article);
    const { token } = useAppSelector(state => state.auth);
    const { categories } = useAppSelector(state => state.category);
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string | null>(null)


    const onLogout = () => handleLogout(setOpenDialog)
    const onConfirmLogout = () => confirmLogout(setOpenDialog, router)
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

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
                dispatch(setCategories(res));
            } catch (error) {
                console.log(error);
            }
        };

        getDataCategories();
    }, [token])

    const filtered = filterArticles(articles, selectedCategory, searchQuery || "");
    return (
        <section className="flex h-screen">
            {/* Sidebar */}
            <AdminLayout open={open} setOpen={setOpen} />

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6 pt-10 lg:ml-64">
                <NavbarAdmin
                    name="Article"
                    onLogout={onLogout}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    onConfirmLogout={onConfirmLogout}
                />

                <div className="mt-5 bg-white rounded-sm border border-gray-200">
                    <h4 className="py-2 px-2 border-b border-gray-200">Total Articles : 25</h4>

                    <div className="p-2 space-y-2 md:flex md:justify-between md:items-center">
                        <div className="flex gap-x-2 items-center">
                            <Select onValueChange={(value) =>
                                setSelectedCategory(value === 'all' ? null : value)}>
                                <SelectTrigger className="bg-white text-gray-900 font-medium data-[placeholder]:text-gray-900">
                                    <SelectValue placeholder="Category" />
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
                                    placeholder="Search by title"
                                    className="pl-8 bg-white"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button
                            className="cursor-pointer"
                            onClick={() => router.push("/admin/articles/create")}
                        >+ Add Articles
                        </Button>
                    </div>

                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead>Thumbnails</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell className="mx-auto">
                                        <img
                                            src={article.imageUrl}
                                            alt="thumb"
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </TableCell>
                                    <TableCell>{article.title}</TableCell>
                                    <TableCell>{article.category.name}</TableCell>
                                    <TableCell>{article.createdAt}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button variant="link" className="text-blue-600 p-0">Preview</Button>
                                        <Button variant="link" className="text-green-600 p-0">Edit</Button>
                                        <Button variant="link" className="text-red-600 p-0">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginationControl
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </main>
        </section>
    )
}
