import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserAddress } from "../services/userApi";
import emptyCart from "../assets/emptyCart.png";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import Notification from "../components/global/notification";
import CartSkeleton from "../components/loading-skeletons/CartSkeleton";
import { updateCart, deleteInCart } from "../services/cartFunction";

const Cart = () => {
  const { user, token } = useAuth();
  const {
    cartItems,
    totalPrice,
    productsInCart,
    setCartItems,
    setTotalPrice,
    setTotalInCart,
    setProductsInCart
  } = useCart();
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState([]);
  const [message, setMessage] = useState([])
  const [show, setShow] = useState(false)
  const navigate = useNavigate();

  // Fetch cart from backend
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        // fetch user address
        const getAddress = await getUserAddress(user.user_id, token);
        setAddress(getAddress.data[0]);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) fetchAddress();
  }, [user, token]);

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

    const handleRemoveItem = async (productId) => {
    const response = await deleteInCart(user.user_id, token, productId);
    if (response.success) {
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
      setTotalInCart(response.data.items.length);
      setMessage("Product Removed from cart");
      setShow(true);

      const leftProducts = productsInCart.filter(
        (item) => item._id !== productId
      );
      setProductsInCart(leftProducts);
    } else {
      console.log("Error deleting product from cart", response.message);
    }
  };

  if (loading)
    return (
      <div className="">
        <CartSkeleton />
      </div>
    );

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
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-950 md:p-8">
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl lg:grid-cols-3">
        {/* Left Side - Cart Items */}
        <div className="space-y-6 lg:col-span-2">
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          <p className="text-gray-500">
            {cartItems.length} items in your cart.
          </p>

          <div className="space-y-4">
            {productsInCart.map((product, index) => {
              const item = cartItems.find(
                (item) => item.product_id === product._id
              );

              if (!item) return null;

              const itemTotal = (product.price * item.quantity).toFixed(2);
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-between p-4 bg-white shadow dark:bg-gray-800 rounded-xl sm:flex-row"
                >
                  <div className="flex items-center w-full gap-4 md:w-auto">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="object-cover w-24 h-24 rounded"
                    />
                    <div className="p-3">
                      <p className="text-sm text-gray-800 capitalize dark:text-gray-200">
                        {product.category}
                      </p>
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {product.color ? `Color: ${product.color} |` : ""}{" "}
                        {product.weight ? `Weight: ${product.weight}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-6 mt-4 md:mt-0">
                    <p className="text-sm font-medium sm:text-base md:text-lg">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => {
                          if (item && item.quantity > 1) {
                            handleUpdateQty(product._id, item.quantity - 1);
                          } else {
                            handleRemoveItem(product._id);
                          }
                        }}
                        className="px-2"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQty(product._id, item.quantity + 1)
                        }
                        className="px-2"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-yellow-600 sm:text-base md:text-lg">
                      ${itemTotal}
                    </p>
                    {/* delete icon */}
                    <button
                      onClick={() => {
                        handleRemoveItem(product._id);
                      }}
                      className="text-red-500"
                    >
                      <Trash2 />{" "}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="p-6 space-y-6 bg-white dark:bg-gray-800 border max-h-[36rem] shadow rounded-xl">
          <div>
            <h4 className="mb-2 font-semibold">Shipping Address</h4>
            <div className="space-y-2">
              {/* address line */}
              <input
                defaultValue={address.addressLine}
                type="text"
                placeholder="Address Line"
                className="w-full py-2 pl-3 text-black border rounded-lg outline-none dark:text-white"
              />
              {/* country */}
              <input
                defaultValue={address.country}
                type="text"
                placeholder="Country"
                className="w-full py-2 pl-3 text-black border rounded-lg outline-none dark:text-white"
              />
              {/* city */}
              <input
                defaultValue={address.city}
                type="text"
                placeholder="State / City"
                className="w-full py-2 pl-3 text-black border rounded-lg outline-none dark:text-white"
              />
              {/* Postal code */}
              <input
                defaultValue={address.postalCode}
                type="text"
                placeholder="Postal Code"
                className="w-full py-2 pl-3 text-black border rounded-lg outline-none dark:text-white"
              />
              <button className="px-2 py-1 border rounded-lg">Update</button>
            </div>
          </div>

          <div className="p-4 space-y-2 bg-yellow-100 rounded-xl">
            <h4 className="font-semibold text-black">Cart Total</h4>
            <div className="flex justify-between text-sm text-black">
              <span>Cart Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-black">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm text-black">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-black">
              <span>Cart Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              className="w-full py-1 mt-3 text-black bg-yellow-200 border rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {show && (
        <Notification
          message={message}
          duration={800}
          onClose={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default Cart;
