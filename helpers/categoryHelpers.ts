export function filterCategory(
    categories: any[],
    searchQuery: string
) {
    return categories.filter((category) => {

        const matchesSearch = searchQuery
            ? category.name.toLowerCase().includes(searchQuery.toLowerCase())
            : true

        return matchesSearch
    })
}