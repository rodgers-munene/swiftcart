// CartPage.jsx
import React, { useEffect, useState } from "react";
import { getCart, updateCart, deleteInCart } from "../services/cartFunction";
import { useAuth } from "../context/AuthContext";
import { getProductById } from "../services/backendApi";
import emptyCart from "../assets/emptyCart.png";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user, token } = useAuth(); // Replace with your actual auth context or props
  const [cartItems, setCartItems] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  // Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(user.user_id, token);
        setCartItems(data.items || []);
        setTotalPrice(data.totalPrice);

        // fetch product info after fetching cart
        const productInfos = await Promise.all(
          data.items.map((item) => getProductById(item.product_id))
        );
        setProductsInCart(productInfos);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) fetchCart();
  }, [user, token, getCart]);

  // Update quantity
  const handleUpdateQty = async (productId, newQty) => {
    const response = await updateCart(user.user_id, token, productId, newQty);

    if (response.success) {
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
    } else {
      console.log("Error updating product cart");
    }
  };

  const handleRemoveItem = async (productId) => {
    const response = await deleteInCart(user.user_id, token, productId)

    if(response.success){
      setCartItems(response.data.items)
      setTotalPrice(response.data.totalPrice)

      const updatedProducts = productsInCart.filter((item) => item.product_id !== productId)

      setProductsInCart(updatedProducts)

    }else{
      console.log("Error deleting product from cart", response.message)
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  // what to return if the cart is empty
  if (cartItems.length === 0)
    return (
      <div className="min-h-[70vh] w-full flex flex-col items-center justify-center">
        <img src={emptyCart} alt="empty-cart" />
        <p className="border px-12 py-3 text-red-600 border-gray-400 mt-4">
          Your cart is currently empty
        </p>
        <button
          onClick={() => {
            navigate("/categories");
          }}
          className="mt-3 px-2 py-2 border rounded-md text-white bg-black "
        >
          Return to Shop
        </button>
      </div>
    );

  // what to return if the cart has items
  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          <p className="text-gray-500">
            {cartItems.length} items in your cart.
          </p>

          <div className="space-y-4">
            {productsInCart.map((product, index) => { 

              const item = cartItems.find((item) => item.product_id === product._id)

              if(!item) return null;

              const itemTotal = (product.price * item.quantity).toFixed(2)
            
            return(
              <div
                key={index}
                className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row items-center justify-between"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm text-gray-500 capitalize">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-500">
                      {product.color ? `Color: ${product.color} |` : ""}{" "}
                      {product.weight ? `Weight: ${product.weight}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-6 mt-4 md:mt-0">
                  <p className="text-lg font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => {
                        if(item && item.quantity > 1){
                          handleUpdateQty(
                          product._id,
                          item.quantity - 1
                        );
                        }else{
                          handleRemoveItem(product._id)
                        }
                      }}
                      className="px-2"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQty(
                          product._id,
                          item.quantity + 1
                        )
                      }
                      className="px-2"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-yellow-600 font-semibold">
                    ${itemTotal}
                  </p>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Calculated Shipping</h4>
            <div className="space-y-2">
              <input type="text" placeholder="Country" className="" />
              <input type="text" placeholder="State / City" />
              <button className="w-full">Update</button>
            </div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl space-y-2">
            <h4 className="font-semibold">Cart Total</h4>
            <div className="flex justify-between text-sm">
              <span>Cart Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Cart Total</span>
              <span>${(totalPrice - discount).toFixed(2)}</span>
            </div>
            <button className="w-full">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
