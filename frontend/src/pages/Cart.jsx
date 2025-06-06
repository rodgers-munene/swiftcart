// CartPage.jsx
import React, { useEffect, useState } from 'react';
import { getCart } from '../services/cartFunction'; 
import { useAuth } from '../context/AuthContext'; 

const  Cart = () => {
  const { user, token } = useAuth(); // Replace with your actual auth context or props
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(user.user_id, token);
        setCartItems(data.items || []);
        setTotalPrice(data.totalPrice)
        
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) fetchCart();
  }, [user, token, getCart]);


  // Update quantity 
  const handleUpdateQty = (productId, newQty) => {
    // Call backend update quantity API here
  };

  const handleRemoveItem = (productId) => {
    // Call backend delete item API here
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row justify-between items-center border p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleUpdateQty(item._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQty(item._id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>

                  <p className="font-semibold text-green-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-semibold">Total: {totalPrice.toFixed(2)}</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
