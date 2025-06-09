import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext'
import { getOrders } from "../services/orderFunction";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  const {user, token} = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await getOrders(user.user_id, token)
      setOrders(orderData.data)
      console.log(orderData.data)
    }

    if(user && token) {
      fetchOrders()
    }
  }, [user, token])

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <div className="">
              <h2 className="text-xl font-semibold mb-4">Account Details</h2>
              {/* first and last name */}

              <div className="flex">
                 <div className="flex flex-col">
                  <label htmlFor="firstName" className="mb-1">First Name:</label>
                  <input type="text" id="firstName" value={user.firstName} readOnly className="border pl-2 py-1 rounded-md w-44 outline-none" />
                </div>
                <div className="flex flex-col ml-4">
                  <label htmlFor="lastName" className="mb-1">Last Name:</label>
                  <input type="text" id="lastName" value={user.lastName} readOnly className="border pl-2 py-1 rounded-md w-44 outline-none" />
                </div>
              </div>

              {/* email */}
              <div className="flex flex-col mt-1">
                <label htmlFor="email" className="mb-1">Email: </label>
                <input type="email" name="" id="email" value={user.email} readOnly={true} className="border w-64 pl-2 py-1 rounded-md outline-none"/>
              </div>

          </div>;

      case "orders":
        return <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-semibold mb-2">Order Summary </h2>
                {orders.map((order, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Payment Status:</span>
                      <span className={order.paymentStatus === 'pending' ? 'text-red-500' : 'text-green-600'}>
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Order Status:</span>
                      <span className="capitalize">{order.orderStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total Items:</span>
                      <span>{order.items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total Price:</span>
                      <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Payment Method:</span>
                      <span className="capitalize">{order.paymentMethod}</span>
                    </div>
                 
                </div>
                ))}
              </div>
      case "addresses":
        return <div><h2 className="text-xl font-semibold mb-4">Saved Addresses</h2><p>Manage your shipping and billing addresses.</p></div>;
      case "wishlist":
        return <div><h2 className="text-xl font-semibold mb-4">Your Wishlist</h2><p>Items you wish to purchase later.</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r p-4 space-y-4">
          <button
            className={`w-full text-left p-2 rounded ${activeTab === "account" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
            onClick={() => setActiveTab("account")}
          >
            Account Details
          </button>
          <button
            className={`w-full text-left p-2 rounded ${activeTab === "orders" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`w-full text-left p-2 rounded ${activeTab === "addresses" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
            onClick={() => setActiveTab("addresses")}
          >
            Addresses
          </button>
          <button
            className={`w-full text-left p-2 rounded ${activeTab === "wishlist" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
            onClick={() => setActiveTab("wishlist")}
          >
            Wishlist
          </button>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Profile