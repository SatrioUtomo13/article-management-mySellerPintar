import axios from "axios";
import { RegisterData, LoginData } from "@/types/auth";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
}); 

/* === AUTH === */
export const register = async (data: RegisterData) => {
    try {
        const res = await axiosInstance.post("auth/register", data)
        return res.data
    } catch (error: any) {
        console.error("Register error:", error.response?.data || error.message);
        throw error;
    }
}

export const login = async (data: LoginData) => {
    try {
        const res = await axiosInstance.post("auth/login", data)
        return res.data
    } catch (error: any) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
    }
}

export const fetchUserProfile = async (token: string) => {
    try {
        const res = await axiosInstance.get("auth/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Fetch profile error:", error.response?.data || error.message);
        throw error;
    }
}

/* === ARTICLES === */
export const createArticle = async (token: string, data: any) => {
    try {
        const res = await axiosInstance.post("articles", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Create error:", error.response?.data || error.message);
        throw error;
    }
}

export const fetchArticles = async (token: string, page = 1) => {
    try {
        const res= await axiosInstance.get(`articles/?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            })
        return res.data
    } catch (error: any) {
        console.error("Fetch error:", error.response?.data || error.message);
        throw error;
    }
}

export const fetchArticleById = async (token: string, id: string) => {
    try {
        const res = await axiosInstance.get(`articles/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Fetch error:", error.response?.data || error.message);
        throw error;
    }
}

export const updateArticle = async (token: string, id: string, data: any) => {
    try {
        const res = await axiosInstance.put(`articles/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Update error:", error.response?.data || error.message);
        throw error;
    }
}

export const deleteArticle = async (token: string, id: string) => {
    try {
        const res = await axiosInstance.delete(`articles/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Delete error:", error.response?.data || error.message);
        throw error;
    }
}

/* === CATEGORY === */
export const fetchCategories = async (token: string,  page = 1) => {
    try {
        const res = await axiosInstance.get(`categories/?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Fetch error:", error.response?.data || error.message);
        throw error;
    }
}

export const fetchAllCategories = async (token: string) => {
    try {
        const res = await axiosInstance.get(`categories`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Fetch error:", error.response?.data || error.message);
        throw error;
    }
}

export const createCategory = async (token: string, name: string) => {
    try {
        const res = await axiosInstance.post("categories", {name}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Create error:", error.response?.data || error.message);
        throw error;
    }
}

export const updateCategory = async (token: string, id: string, name: string) => {
    try {
        const res = await axiosInstance.put(`categories/${id}`, {name}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Update error:", error.response?.data || error.message);
        throw error;
    }
}

export const deleteCategory = async (token: string, id: string) => {
    try {
        const res = await axiosInstance.delete(`categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Delete error:", error.response?.data || error.message);
        throw error;
    }
}

/* === IMAGE === */
export const uploadImage = async (token: string, data: FormData) => {
    try {
        const res = await axiosInstance.post("upload", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        return res.data
    } catch (error: any) {
        console.error("Upload error:", error.response?.data || error.message);
        throw error;
    }
}

export default axiosInstance