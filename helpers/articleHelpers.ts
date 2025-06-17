export function handleLogout(setOpenDialog: (value: boolean) => void) {
    setOpenDialog(true)
}

export function confirmLogout(
    setOpenDialog: (value: boolean) => void,
    router: any,

) {
    setOpenDialog(false)
    localStorage.removeItem("token")
    router.push("/login")
}

export function filterArticles(
    articles: any[],
    selectedCategory: string | null,
    searchQuery: string
) {
    return articles.filter((article) => {
        const matchesCategory = selectedCategory
            ? article.category?.name === selectedCategory
            : true

        const matchesSearch = searchQuery
            ? article.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true

        return matchesCategory && matchesSearch
    })
}