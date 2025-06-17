import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import articleReducer from "./articleSlice"
import categoryReducer from "./categorySlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        article: articleReducer,
        category: categoryReducer
    }
})

// Export type untuk useSelector dan useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch