import { createContext, useContext, useState, useEffect } from "react";
import { postCart, getCart, updateCart, deleteInCart } from "../services/cartFunction";
import { getProductById } from "../services/backendApi";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalInCart, setTotalInCart] = useState(0);
  const [productsInCart, setProductsInCart] = useState([])

  // Fetch cart on user/token change
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(user.user_id, token);
        setCartItems(data.items || []);
        setTotalPrice(data.totalPrice);
        setTotalInCart(data.items.length);

        const productInfos = await Promise.all(
            data.items.map((item) => getProductById(item.product_id))
        );
        setProductsInCart(productInfos);

      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (user && token) fetchCart();
  }, [user, token]);

  // Add item to cart
  const handleAddToCart = async (productId, quantity) => {
    const response = await postCart(user.user_id, token, productId, quantity);
    if (response.success) {
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
      setTotalInCart(response.data.items.length);

      const newProduct = await getProductById(productId);
      setProductsInCart([...productsInCart, newProduct])

    } else {
      console.error("Add to cart failed:", response.message);
    }
  };

  // Update item quantity
  const handleUpdateQty = async (productId, newQty) => {
    const response = await updateCart(user.user_id, token, productId, newQty);
    if (response.success) {
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
      setTotalInCart(response.data.items.length);
    } else {
      console.log("Error updating product in cart");
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (productId) => {
    const response = await deleteInCart(user.user_id, token, productId);
    if (response.success) {
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
      setTotalInCart(response.data.items.length);

      const leftProducts = productsInCart.filter((item) => item._id !== productId)
      setProductsInCart(leftProducts)
    } else {
      console.log("Error deleting product from cart", response.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalInCart,
        productsInCart,
        handleAddToCart,
        handleUpdateQty,
        handleRemoveItem,
        setCartItems,
        setTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
