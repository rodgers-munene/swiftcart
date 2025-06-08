import React, { useEffect, useState } from 'react';
import Mpesa from '../assets/mpesa.png'
import Paypal from '../assets/paypal.png'
import creditCard from '../assets/creditCard.png'
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getUserAddress } from '../services/userApi';

const Checkout = () => {
  const {user, token} = useAuth()
  const [paymentMethod, setPaymentMethod] = useState('card');
  const {cartItems, productsInCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState();

   useEffect(() => {
      const fetchAddress = async () => {
        try { 
          // fetch user address
          const getAddress = await getUserAddress(user.user_id, token);
          setAddress(getAddress.data[0])
          
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (user && token) fetchAddress();
    }, [user, token]);

  useEffect(() => {

  })

  if(loading) return <div className='w-full h-[50vh]'>Loading...</div>

  return (
    <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-950 rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Billing Details</h2>
          <div className='flex justify-between'>
            <input value={user.firstName} readOnly placeholder="First Name" className="w-[48%] border rounded p-2 outline-none" />
            <input value={user.lastName} readOnly type="text" placeholder='Last Name' className='w-[48%] border p-2 rounded outline-none'/>
          </div>
          <input value={user.email} readOnly placeholder="Email Address" type="email" className="w-full border rounded p-2 outline-none" />
          <input value={address.country} readOnly placeholder="Country" className="w-full border rounded p-2 outline-none" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input value={address.city} readOnly placeholder="State / County" className="w-full border rounded p-2" />
            <input value={address.postalCode} readOnly placeholder="Zip / Postal Code" className="w-full border rounded p-2" />
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <div className="space-y-2">

              {/* credit card payment methods */}
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
                  <label htmlFor="card" className='flex items-center justify-between border w-full pl-8 pr-4 rounded-md bg-gray-200 dark:bg-gray-800'>
                    Credit Card
                    <img src={creditCard} alt="credit card" />
                    </label>
                </div>
                {paymentMethod === 'card' && (
                  <div className="mt-4 space-y-2 flex flex-col items-center">
                    <input placeholder="Card Number" className="w-[95%] border rounded p-2" />
                    <div className="w-[95%] grid grid-cols-2 gap-2">
                      <input placeholder="Expiry Date" className="w-full border rounded p-2" />
                      <input placeholder="CVV" className="w-full border rounded p-2" />
                    </div>
                  </div>
                )}

              </div>

              {/* paypal payment method */}
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
                  <label htmlFor="paypal" className='flex items-center justify-between border w-full pl-8 pr-4 rounded-md bg-gray-200 dark:bg-gray-800'>
                    PayPal
                    <img src={Paypal} alt="" />
                  </label>
                </div>
                {paymentMethod === 'paypal' && (
                  <div className='mt-2 mb-2 space-y-2 flex justify-center'>
                      <input placeholder="Paypal email.." className="w-[95%] border rounded p-2" />
                  </div>
                )}
              </div>

              {/* mpesa payment method */}
              <div className="flex flex-col">
                <div className="relative flex items-center gap-2">
                  <input 
                  type="radio" 
                  id="mpesa" 
                  name="payment" 
                  value="mpesa" 
                  checked={paymentMethod === 'mpesa'} 
                  onChange={() => setPaymentMethod('mpesa')} 
                  className='absolute left-4'/>
                  <label htmlFor="mpesa" className='flex items-center justify-between border w-full pl-8 pr-2 rounded-md bg-gray-200 dark:bg-gray-800'>
                    M-Pesa
                    <img src={Mpesa} alt="" className='w-12 h-12'/>
                  </label>
                </div>
                {paymentMethod === 'mpesa' && (
                  <div className="mt-4 space-y-2 flex justify-center">
                    <input type='phone' placeholder="M-Pesa Phone Number" className="w-[95%] border rounded p-2" />
                  </div>
                )}
              </div>
            </div>

            

            
          </div>
        </div>

        {/* Cart Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
          <div className="space-y-2 border rounded-md p-4">
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
            <div className=''>
            {productsInCart.map((product, index) => {
              const item = cartItems.find((item) => item.product_id === product._id)

              if(!item) return null

              const itemTotal = (product.price * item.quantity).toFixed(2)
              return (                
                  <div
                  key={index}
                  className='flex justify-between text-sm'>
                      <span>{item.quantity} x {product.title}</span>
                      <span>{itemTotal}</span>
                  </div>
              )
            })}
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 rounded">Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout