// CartPage.jsx
import React, { useEffect, useState } from "react";
import { getCart, updateCart, deleteInCart } from "../services/cartFunction";
import { useAuth } from "../context/AuthContext";
import { getProductById } from "../services/backendApi";
import { getUserAddress } from "../services/userApi";
import emptyCart from "../assets/emptyCart.png";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { formattedPrice } from "../utils/formatPrice";

const Cart = () => {
  const { user, token } = useAuth(); // Replace with your actual auth context or props
  const [cartItems, setCartItems] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState([]);
  const [subtotal, setSubtotal] = useState(0)
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

        // fetch user address
        const getAddress = await getUserAddress(user.user_id, token);
        setAddress(getAddress.data[0])
        
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) fetchCart();
  }, [user, token]);
  
  



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

  if (loading) return <div className="py-10 text-center">Loading...</div>;

  // what to return if the cart is empty
  if (cartItems.length === 0)
    return (
      <div className="min-h-[70vh] w-full flex flex-col items-center justify-center">
        <img src={emptyCart} alt="empty-cart" />
        <p className="px-12 py-3 mt-4 text-red-600 border border-gray-400">
          Your cart is currently empty
        </p>
        <button
          onClick={() => {
            navigate("/categories");
          }}
          className="px-2 py-2 mt-3 text-white bg-black border rounded-md "
        >
          Return to Shop
        </button>
      </div>
    );

  // what to return if the cart has items
  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-8">
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl lg:grid-cols-3">
        {/* Left Side - Cart Items */}
        <div className="space-y-6 lg:col-span-2">
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
                className="flex flex-col items-center justify-between p-4 bg-white shadow rounded-xl sm:flex-row"
              >
                <div className="flex items-center w-full gap-4 md:w-auto">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-cover w-24 h-24 rounded"
                  />
                  <div className="p-3">
                    <p className="text-sm text-gray-500 capitalize">
                      {product.category}
                    </p>
                    <h3 className="text-sm font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-500">
                      {product.color ? `Color: ${product.color} |` : ""}{" "}
                      {product.weight ? `Weight: ${product.weight}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-6 mt-4 md:mt-0">
                  <p className="text-lg font-medium">
                    ${(product.price).toFixed(2)}
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
                  <p className="font-semibold text-yellow-600">
                    ${itemTotal}
                  </p>
                    {/* delete icon */}
                  <button
                  onClick={() => {
                    handleRemoveItem(product._id)
                  }} 
                  className="text-red-500"><Trash2 /> </button>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="p-6 space-y-6 bg-white border shadow rounded-xl">
          <div>
            <h4 className="mb-2 font-semibold">Shipping Address</h4>
            <div className="space-y-2">
              {/* address line */}
              <input
              defaultValue={address.addressLine} 
              type="text" 
              placeholder="Address Line"
              className="w-full py-2 pl-3 text-black border rounded-lg outline-none"/>
              {/* country */}
              <input 
              defaultValue={address.country}
              type="text" 
              placeholder="Country" 
              className="w-full py-2 pl-3 text-black border rounded-lg outline-none" />
              {/* city */}
              <input 
              defaultValue={address.city}
              type="text" 
              placeholder="State / City"  
              className="w-full py-2 pl-3 text-black border rounded-lg outline-none"/>
              {/* Postal code */}
              <input 
              defaultValue={address.postalCode}
              type="text" 
              placeholder="Postal Code" 
              className="w-full py-2 pl-3 text-black border rounded-lg outline-none"/>
              <button className="px-2 py-1 border rounded-lg">Update</button>
            </div>
          </div>

          <div className="p-4 space-y-2 bg-yellow-100 rounded-xl">
            <h4 className="font-semibold">Cart Total</h4>
            <div className="flex justify-between text-sm">
              <span>Cart Subtotal</span>
              <span>${(totalPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span>-${(discount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Cart Total</span>
              <span>${(totalPrice).toFixed(2)}</span>
            </div>
            <button className="w-full py-1 mt-3 border rounded-lg">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
