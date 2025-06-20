'use client';
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

import { login } from "@/lib/api/axios";

const formSchema = z.object({
    username: z.string()
        .min(1, "Please enter your username")
        .min(3, "Username must be at least 3 characters long")
        .max(50, "Username must be at most 50 characters long"),
    password: z.string()
        .min(1, "Please enter your password")
        .min(8, "Password must be at least 8 characters long"),
})

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    // Define submit handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const res = await login(values);

            localStorage.setItem("token", res.token);
            localStorage.setItem("password", values.password)
            toast.success("Registration successful!");

            // Redirect user based on role
            res.role == "Admin"
                ? router.push("/admin/articles")
                : router.push("/articles");
        } catch (error: any) {
            toast.error(error.response?.data.error || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 bg-white xl:bg-gray-100">
            <div className="w-full max-w-sm px-3 py-6 rounded-md xl:bg-white">
                <div className="flex justify-center mb-10 space-x-2">
                    <Image src={"/image.png"} alt="Logo" width={20} height={20} />
                    <h3 className="text-2xl font-bold text-[#000150]">Logoipsum</h3>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 xl:space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-900">Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Input username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-900">Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Input password"
                                                {...field}
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-2.5 text-gray-500"
                                            >
                                                {showPassword ? (
                                                    <Eye className="w-5 h-5" />
                                                ) : (
                                                    <EyeOff className="w-5 h-5" />
                                                )}

                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? "Login..." : "Login"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center mt-4">Don't have an account?
                    <Link href={"/register"} className="text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}
