import axios from "axios";
import { RegisterData, LoginData } from "@/types/auth";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
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

export default axiosInstance