import React, { useEffect, useState } from "react";
import Mpesa from "../assets/mpesa.png";
// import Paypal from '../assets/paypal.png'
// import creditCard from '../assets/creditCard.png'
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getUserAddress } from "../services/userApi";
import { useLocation } from "react-router-dom";
import { placeOrder } from "../services/paymentApi";
import Loader from "../components/global/Loader";

const Checkout = () => {
  const { pathname } = useLocation();
  const { user, token } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const { cartItems, productsInCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState();
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  const formatNumber = (num) => {
    const raw = num.replace(/[\s\-\+]/g, ""); //remove spaces and + signs if any

    if (raw.length === 10 && raw.startsWith("0")) {
      return "254" + num.slice(1);
    } else if (raw.length === 12 && raw.startsWith("254")) {
      return raw;
    }
    return null;
  };

  const handleMpesaPayment = async () => {
    if (!mpesaPhone) {
      alert("Please enter your M-Pesa phone number.");
      return;
    }

    const userPhone = formatNumber(mpesaPhone);
    if (!userPhone) {
      alert("Enter a valid phone Number");
      return;
    }

    try {
      setIsProcessing(true);
      const response = await placeOrder(userPhone, 1);
      if (response.success) {
        console.log("STK push initiated ");
      }
    } catch (err) {
      console.error(err);
      console.log("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="w-full h-[50vh]">Loading...</div>;

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-8 dark:bg-gray-800">
      <div className="grid max-w-5xl grid-cols-1 gap-8 p-6 mx-auto bg-white shadow-md dark:bg-gray-950 rounded-xl md:grid-cols-2">
        {/* Billing Details */}
        <div className="space-y-4">
          <h2 className="mb-2 text-xl font-semibold">Billing Details</h2>
          <div className="flex justify-between">
            <input
              value={user.firstName}
              readOnly
              placeholder="First Name"
              className="w-[48%] border rounded p-2 outline-none"
            />
            <input
              value={user.lastName}
              readOnly
              type="text"
              placeholder="Last Name"
              className="w-[48%] border p-2 rounded outline-none"
            />
          </div>
          <input
            value={user.email}
            readOnly
            placeholder="Email Address"
            type="email"
            className="w-full p-2 border rounded outline-none"
          />
          <input
            value={address.country}
            readOnly
            placeholder="Country"
            className="w-full p-2 border rounded outline-none"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              value={address.city}
              readOnly
              placeholder="State / County"
              className="w-full p-2 border rounded"
            />
            <input
              value={address.postalCode}
              readOnly
              placeholder="Zip / Postal Code"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Payment Method</h2>
            <div className="space-y-2">
              {/* credit card payment methods
              <div className="flex flex-col">
                <div className='relative flex items-center gap-2'>
                  <input 
                  type="radio" 
                  id="card" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')}
                  className='absolute left-4'
                   />
                  <label htmlFor="card" className='flex items-center justify-between w-full pl-8 pr-4 bg-gray-200 border rounded-md dark:bg-gray-800'>
                    Credit Card
                    <img src={creditCard} alt="credit card" />
                    </label>
                </div>
                {paymentMethod === 'card' && (
                  <div className="flex flex-col items-center mt-4 space-y-2">
                    <input placeholder="Card Number" className="w-[95%] border rounded p-2" />
                    <div className="w-[95%] grid grid-cols-2 gap-2">
                      <input placeholder="Expiry Date" className="w-full p-2 border rounded" />
                      <input placeholder="CVV" className="w-full p-2 border rounded" />
                    </div>
                  </div>
                )}

              </div> */}

              {/* paypal payment method
              <div className="flex flex-col">
                <div className='relative flex items-center gap-2'>
                  <input 
                  type="radio" 
                  id="paypal" 
                  name="payment" 
                  value="paypal" 
                  checked={paymentMethod === 'paypal'} 
                  onChange={() => setPaymentMethod('paypal')} 
                  className='absolute left-4'
                  />
                  <label htmlFor="paypal" className='flex items-center justify-between w-full pl-8 pr-4 bg-gray-200 border rounded-md dark:bg-gray-800'>
                    PayPal
                    <img src={Paypal} alt="" />
                  </label>
                </div>
                {paymentMethod === 'paypal' && (
                  <div className='flex justify-center mt-2 mb-2 space-y-2'>
                      <input placeholder="Paypal email.." className="w-[95%] border rounded p-2" />
                  </div>
                )}
              </div> */}

              {/* mpesa payment method */}
              <div className="flex flex-col">
                <div className="relative flex items-center gap-2">
                  <input
                    type="radio"
                    id="mpesa"
                    name="payment"
                    value="mpesa"
                    checked={paymentMethod === "mpesa"}
                    onChange={() => setPaymentMethod("mpesa")}
                    className="absolute left-4"
                  />
                  <label
                    htmlFor="mpesa"
                    className="flex items-center justify-between w-full pl-8 pr-2 bg-gray-200 border rounded-md dark:bg-gray-800"
                  >
                    M-Pesa
                    <img src={Mpesa} alt="" className="w-12 h-12" />
                  </label>
                </div>
                {paymentMethod === "mpesa" && (
                  <div className="flex justify-center mt-4 space-y-2">
                    <input
                      value={mpesaPhone}
                      onChange={(e) => {
                        setMpesaPhone(e.target.value);
                      }}
                      type="phone"
                      placeholder="M-Pesa Phone Number"
                      className="w-[95%] border rounded p-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="space-y-4">
          <h2 className="mb-2 text-xl font-semibold">Cart Summary</h2>
          <div className="p-4 space-y-2 border rounded-md">
            {/* <div className="flex justify-between text-sm">
              <span>1 x Maker The Agency Theme</span>
              <span>$49.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>1 x Cozy UI Kit for Blog / Magazine</span>
              <span>$32.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>1 x Minimalistic Ecommerce UI Kit</span>
              <span>$19.46</span>
            </div> */}
            <div className="">
              {productsInCart.map((product, index) => {
                const item = cartItems.find(
                  (item) => item.product_id === product._id
                );

                if (!item) return null;

                const itemTotal = (product.price * item.quantity).toFixed(2);
                return (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.quantity} x {product.title}
                    </span>
                    <span>{itemTotal}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between pt-2 font-semibold border-t">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          {/* payment button */}
          {paymentMethod === "mpesa" && (
            <button
              onClick={handleMpesaPayment}
              disabled={isProcessing}
              className="w-full py-2 text-lg font-semibold text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isProcessing ? <Loader small /> : "Pay with M-Pesa"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
