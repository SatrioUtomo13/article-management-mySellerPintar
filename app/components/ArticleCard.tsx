'use client'

import { useState, useEffect } from "react";

import Link from "next/link";
export default function ArticleCard({ article }: { article: any }) {

    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const date = new Date(article.createdAt);
        const formatted = date.toLocaleDateString("id-ID", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        setFormattedDate(formatted);
    }, [article.createdAt]);
    return (
        <Link href={{
            pathname: `/articles/${article.id}`,
            query: { categoryId: article.categoryId }
        }}>
            <div key={article.id} className="cursor-pointer p-2 rounded-xl  hover:bg-slate-100">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-xl"
                />
                <p className="text-sm text-gray-500">
                    {formattedDate}
                </p>
                <h2 className="text-lg font-semibold">{article.title}</h2>
                <p className="text-gray-600 line-clamp-2">
                    {article.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
                </p>
                {article.category && (
                    <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full mt-2 inline-block">
                        {article.category.name}
                    </span>
                )}
            </div>
        </Link>
    );
}