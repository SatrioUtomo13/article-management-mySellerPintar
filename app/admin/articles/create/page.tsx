'use client'

import { useRouter } from "next/navigation"
import { ArrowLeft, UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import React, { useState, useEffect, use } from 'react'
import AdminLayout from '@/app/components/AdminLayout'
import NavbarAdmin from '@/app/components/NavbarAdmin'
import { handleLogout, confirmLogout } from "@/helpers/articleHelpers"
import TiptapEditor from "@/app/components/Editor";
import { fetchCategories, createArticle, uploadImage } from "@/lib/api/axios";
import { setCategories } from "@/store/categorySlice"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Category } from "@/types/article"

const formSchema = z.object({
    title: z.string().min(1, "Please enter title"),
    content: z.string().min(1, "Content field cannot be empty"),
    category: z.string().min(1, "Please select category"),
})

export default function page() {
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const { categories } = useAppSelector(state => state.category);
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch()

    const onLogout = () => handleLogout(setOpenDialog)
    const onConfirmLogout = () => confirmLogout(setOpenDialog, router)

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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            category: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!imageFile || !token) {
            toast.warning("Please upload an image.");
            return;
        }

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("image", imageFile)

            const uploadImageRes = await uploadImage(token, formData)
            const imageUrl = uploadImageRes.imageUrl

            const data = {
                title: values.title,
                content: values.content,
                categoryId: values.category,
                imageUrl: imageUrl
            }

            const articleRes = await createArticle(token, data)

            if (articleRes) {
                toast.success("Article created successfully!");
                router.push("/admin/articles")
            }

        } catch (err) {
            console.error(err)
            toast.error("Failed to create article")
        } finally {
            setLoading(false)
        }
    }

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

                <div className="mt-5 bg-gray-50">
                    <Card className="p-6 space-y-6">
                        <div className="flex gap-x-2">
                            <ArrowLeft />
                            <span>Create Articles</span>
                        </div>
                        {/* Thumbnails Upload */}
                        <div>
                            <Label className="mb-2 block">Thumbnails</Label>
                            <div className="border border-dashed border-gray-300 rounded-md p-6 flex justify-center items-center text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">
                                <UploadCloud className="w-5 h-5 mr-2" />
                                <span>Click to select files <br /> <small>Support File Type: .jpg or .png</small></span>
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    className=""
                                    placeholder="Click to select files"
                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                />
                                {!imageFile && (
                                    <p className="text-sm text-red-500">Please enter picture.</p>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Input title"
                                {...form.register("title")}
                            />
                            {form.formState.errors.title && (
                                <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={(value) => form.setValue("category", value)}>
                                <SelectTrigger id="category" className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories
                                        .filter(category => category.id && category.name) // pastikan tidak undefined / kosong
                                        .map((category: Category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            {form.formState.errors.category && (
                                <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                                The existing category list can be seen in the <a href="/admin/category" className="text-blue-500 underline">category</a> menu
                            </p>
                        </div>

                        {/* Content */}
                        <div>
                            <Label htmlFor="content">Content</Label>
                            <TiptapEditor
                                content={form.watch("content")}
                                setContent={(val) => form.setValue("content", val)}
                            />
                            {form.formState.errors.content && (
                                <p className="text-sm text-red-500">{form.formState.errors.content.message}</p>
                            )}
                            {/* <p className="text-xs text-muted-foreground mt-1">{content.length} Words</p> */}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                            <Button
                                variant="secondary"
                                onClick={async () => {
                                    const title = form.watch("title");
                                    const content = form.watch("content");
                                    const category = form.watch("category");

                                    if (!title || !content || !category || !imageFile) {
                                        toast.warning("Please fill in all the required fields.");
                                        return;
                                    }

                                    const toBase64 = (file: File): Promise<string> =>
                                        new Promise((resolve, reject) => {
                                            const reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onload = () => resolve(reader.result as string);
                                            reader.onerror = reject;
                                        });

                                    const imageBase64 = await toBase64(imageFile);

                                    const previewData = {
                                        title,
                                        content,
                                        category,
                                        imageUrl: imageBase64,
                                        createdAt: new Date().toISOString(),
                                        user: { username: "You" },
                                    };

                                    localStorage.setItem("previewArticle", JSON.stringify(previewData));
                                    router.push("/admin/articles/preview");
                                }}
                            >
                                Preview
                            </Button>


                            <Button
                                type="submit"
                                onClick={form.handleSubmit(onSubmit)}
                                disabled={loading}
                            >
                            </Button>
                        </div>
                    </Card>
                </div>
            </main>
        </section>
    )
}
