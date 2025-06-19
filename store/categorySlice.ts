import { createSlice } from "@reduxjs/toolkit";
import { Category } from "@/types/article";

interface CategoryState {
    categories: Category[],
    totalData: number,
    currentPage: number,
    totalPages: number
}

const initialState: CategoryState = {
    categories: [],
    totalData: 0,
    currentPage: 1,
    totalPages: 0
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload.data
            state.totalData = action.payload.totalData
            state.currentPage = action.payload.currentPage
            state.totalPages = action.payload.totalPages
        },
        setAllCategories: (state, action) => {
            state.categories = action.payload
        }
    }
})

export const { setCategories, setAllCategories } = categorySlice.actions;
export default categorySlice.reducer;