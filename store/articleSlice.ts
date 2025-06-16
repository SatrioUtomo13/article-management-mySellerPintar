import { createSlice } from "@reduxjs/toolkit";
import { Article } from "@/types/article";

interface ArticleState {
    articles: Article[],
    page: number,
    total: number,
    limit: number
}

const initialState: ArticleState = {
    articles: [],
    page: 1,
    total: 0,
    limit: 10,
}
const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        setArticles: (state, action) => {
            state.articles = action.payload.data;
            state.page = action.payload.page;
            state.total = action.payload.total;
            state.limit = action.payload.limit;
        },
        addArticle: (state, action) => {
                state.articles.push(action.payload);
        },
        removeArticle: (state, action) => {
            state.articles = state.articles.filter(
                (article) => article.id !== action.payload
            );
        },
    },
});

export const { setArticles, addArticle, removeArticle } = articleSlice.actions;
export default articleSlice.reducer;