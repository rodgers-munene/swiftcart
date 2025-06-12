import { CarFront, CreditCard, ShieldHalf, Headphones } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// get all products
export const getProducts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`);
    const data = res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products!!");
    return [];
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error Fetching Categories!!");
    return [];
  }
};

export const topCategories = [
  "Beauty",
  "Furniture",
  "Laptops",
  "Smartphones",
  "Mens clothing",
  "Womens clothing",
  "Accessories",
  "Vehicle",
];
// get services data
export const serviceData = [
  {
    icon: CarFront,
    title: "Free Shipping",
    subtitle: "Enjoy fast, free delivery on all orders.",
    bg: "#fdefe6",
  },
  {
    icon: CreditCard,
    title: "Safe Payment",
    subtitle: "Pay securely with trusted payment methods.",
    bg: "#ceebe9",
  },
  {
    icon: ShieldHalf,
    title: "Secure Payment",
    subtitle: "Your personal data is protected with us.",
    bg: "#e2f2b2",
  },
  {
    icon: Headphones,
    title: " Back Guarantee",
    subtitle: "100% satisfaction guaranteed.",
    bg: "#d6e5fb",
  },
];

// get products in a certain category

export const getProductsInCategory = async (
  category,
  limit = 20,
  minPrice = 0,
  maxPrice = 50000
) => {
  try {
    const categoryParam = Array.isArray(category)
      ? category.join(",")
      : category;
    const res = await fetch(
      `${API_BASE_URL}/api/categories/products?category=${categoryParam}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching Products!!");
    return [];
  }
};

// get product by id
export const getProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching Product!!!", error);
    return [];
  }
};

// get highest discounted products
export const getHighestDiscountedProducts = async (limit) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/products/highest-discount?&limit=${limit}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products");
    return [];
  }
};
