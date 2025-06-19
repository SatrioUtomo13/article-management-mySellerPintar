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

import { deleteCategory } from "@/lib/api/axios"
import { useAppDispatch, useAppSelector } from "@/hooks";


type DeleteConfirmProps = {
    name: string | null,
    id: string | null,
    isDeleteDialogOpen: boolean,
    setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void,
    onSuccessDelete: () => void
}

export default function DeleteConfirm({ name, id, isDeleteDialogOpen, setIsDeleteDialogOpen, onSuccessDelete }: DeleteConfirmProps) {
    const { token } = useAppSelector(state => state.auth);


    const onConfirm = async () => {
        if (!token || !id) return
        try {
            const res = await deleteCategory(token, id)
            if (res) {
                toast.success("Successfully delete category")
                onSuccessDelete()
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed delete category")
        }
    }
    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className='flex flex-col items-start'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-start'>Delete Category</AlertDialogTitle>
                    <AlertDialogDescription>
                        Delete category "{name}"? This will remove it from master data permanently
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
