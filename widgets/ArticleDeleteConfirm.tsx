'uses client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React from 'react'
import { toast } from "sonner"

import { deleteArticle } from "@/lib/api/axios"
import { useAppDispatch, useAppSelector } from "@/hooks";

type ArticleDeleteConfirmProps = {
    id: string | null,
    isDeleteDialogOpen: boolean,
    setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void,
    onSuccessDelete: () => void
}

export default function ArticleDeleteConfirm({ id, isDeleteDialogOpen, setIsDeleteDialogOpen, onSuccessDelete }: ArticleDeleteConfirmProps) {
    const { token } = useAppSelector(state => state.auth);

    const onConfirm = async () => {
        if (!token || !id) return
        try {
            const res = await deleteArticle(token, id)
            if (res) {
                toast.success("Successfully delete article")
                onSuccessDelete()
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed delete article")
        }
    }
    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className='flex flex-col items-start'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-start'>Delete Article</AlertDialogTitle>
                    <AlertDialogDescription>
                        Deleting this article is permanent and cannot be undone. All related content will be removed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-row justify-end w-full'>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-red-600 hover:bg-red-700' onClick={onConfirm}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
