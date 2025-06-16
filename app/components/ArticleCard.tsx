'use client'

export default function ArticleCard({ article }: { article: any }) {
    return (
        <div key={article.id}>
            <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 object-cover rounded-xl"
            />
            <p className="text-sm text-gray-500">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })}
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
    );
}