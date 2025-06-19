'use client'

import React, { useState, useEffect, use } from 'react'
import { useRouter } from "next/navigation"
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import { useAppDispatch, useAppSelector } from "@/hooks";
import AdminLayout from '@/app/components/AdminLayout'
import NavbarAdmin from '@/app/components/NavbarAdmin'
import { handleLogout, confirmLogout } from "@/helpers/articleHelpers"
import { filterCategory } from '@/helpers/categoryHelpers';
import { fetchCategories, createCategory, updateCategory } from "@/lib/api/axios";
import { setCategories } from "@/store/categorySlice"
import PaginationControl from "@/widgets/PaginationControl"
import DeleteConfirm from '@/widgets/DeleteConfirm';


const formSchema = z.object({
    name: z.string().min(1, "Category field cannot be empty"),
})

export default function page() {
    const router = useRouter()

    const { token } = useAppSelector(state => state.auth);
    const { categories, totalPages } = useAppSelector(state => state.category);
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCategoryToEdit, setSelectedCategoryToEdi] = useState<{ id: string, name: string } | null>(null)

    const onLogout = () => handleLogout(setOpenDialog)
    const onConfirmLogout = () => confirmLogout(setOpenDialog, router)

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!token) return;
        setLoading(true);

        try {
            if (isEditMode && selectedCategoryToEdit) {
                const updated = await updateCategory(token, selectedCategoryToEdit.id, values.name)
                updated && toast.success("Category updated successfully!");
            } else {
                const dataRes = await createCategory(token, values.name)
                dataRes && toast.success("Category created successfully!");
            }

            await getDataCategories();
            form.reset(); // reset form field setelah submit
            setAddDialogOpen(false); // TUTUP DIALOG!
            setIsEditMode(false)
            setSelectedCategoryToEdi(null)

        } catch (err) {
            console.error(err)
            toast.error("Failed to save category")
        } finally {
            setLoading(false)
        }
    }

    const getDataCategories = async () => {
        if (!token) return;
        try {
            const res = await fetchCategories(token, currentPage);
            dispatch(setCategories(res));
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getDataCategories();
    }, [token, currentPage])


    const filtered = filterCategory(categories, searchQuery || "");


    return (
        <section className="flex h-screen">
            {/* Sidebar */}
            <AdminLayout open={open} setOpen={setOpen} />

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6 pt-10 lg:ml-64">
                <NavbarAdmin
                    name="Category"
                    onLogout={onLogout}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    onConfirmLogout={onConfirmLogout}
                />

                <div className="mt-5 bg-white rounded-sm border border-gray-200">
                    <h4 className="py-2 px-2 border-b border-gray-200">Total Category : 25</h4>

                    <div className="p-2 space-y-2 md:flex md:justify-between md:items-center">
                        <div className="relative text-slate-400">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                            <Input
                                placeholder="Search by title"
                                className="pl-8 bg-white"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <Dialog
                            open={addDialogOpen}
                            onOpenChange={(open) => {
                                setAddDialogOpen(open)
                                if (!open) {
                                    form.reset()
                                    setIsEditMode(false)
                                    setSelectedCategoryToEdi(null)
                                }
                            }}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className='bg-blue-600 text-white hover:bg-blue-700 hover:text-white'
                                    onClick={() => setAddDialogOpen(true)}
                                >
                                    + Add Category
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <DialogHeader>
                                        <DialogTitle>{isEditMode ? "Edit Category" : "Add Category"}</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-1">Category</Label>
                                            <Input
                                                id="name-1"
                                                placeholder='Input Category'
                                                {...form.register("name")}
                                            />
                                            {form.formState.errors.name && (
                                                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <DialogFooter className='mt-5'>
                                        <DialogClose asChild>
                                            <Button variant="outline" className='cursor-pointer'>Cancel</Button>
                                        </DialogClose>
                                        <Button
                                            type="submit"
                                            className='bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer'
                                            disabled={loading}
                                        >
                                            {loading ? "Loading..." : isEditMode ? "Update" : "Add"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>

                    </div>

                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.createdAt}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button
                                            variant="link"
                                            className="text-green-600 p-0"
                                            onClick={() => {
                                                setIsEditMode(true)
                                                setSelectedCategoryToEdi({ id: category.id, name: category.name })
                                                setAddDialogOpen(true)
                                                form.setValue("name", category.name)
                                            }}
                                        >Edit
                                        </Button>
                                        <Button
                                            variant="link"
                                            className="text-red-600 p-0"
                                            onClick={() => {
                                                setIsDeleteDialogOpen(true)
                                                setSelectedCategoryName(category.name)
                                                setSelectedCategoryId(category.id)
                                            }}
                                        >Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Delete confirmation */}
                    <DeleteConfirm
                        name={selectedCategoryName}
                        id={selectedCategoryId}
                        isDeleteDialogOpen={isDeleteDialogOpen}
                        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                        onSuccessDelete={getDataCategories}
                    />
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
