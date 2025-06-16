import { createSlice } from "@reduxjs/toolkit";
import { Category } from "@/types/article";

interface CategoryState {
    categories: Category[]
}

const initialState: CategoryState = {
    categories: []
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        }
    }
})

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;