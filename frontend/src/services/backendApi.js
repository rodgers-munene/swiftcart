export const getProducts = async () => {
    try {
        const res = await fetch('http://localhost:5001/api/products')
        const data = res.json()
        return data;
    } catch (error) {
        console.error("Error fetching products!!")
    }
}

export const getCategories = async () =>{
    try {
        const res = await fetch('http://localhost:5001/api/categories')
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error Fetching Categories!!')
    }
}

export const topCategories = [
    "Beauty",
    "Furniture",
    "Laptops",
    "Smartphones",
    "Mens clothing",
    "Womens clothing",
    "Accessories",
    "Vehicle"
]

// get products in a certain category

export const getProductsInCategory = async (category, limit) => {
    try {
        const categoryParam = category.join(',')
        const res = await fetch(`http://localhost:5001/api/categories/products?category=${categoryParam}&limit=${limit}`)
        const data = await res.json()
        return data;
    } catch (error) {
        console.error("Error fetching Products!!")
        return []
    }
} 