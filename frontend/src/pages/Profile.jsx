import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext'
import { getOrders } from "../services/orderFunction";
import { getUserAddress } from "../services/userApi";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  const {user, token} = useAuth()
  const [orders, setOrders] = useState([])
  const [address, setAddress] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await getOrders(user.user_id, token)
      const addressData = await getUserAddress(user.user_id, token)
      setOrders(orderData.data)
      setAddress(addressData.data[0])
      console.log(addressData.data)
    }

    if(user && token) {
      fetchOrders()
    }
  }, [user, token])

  const formatDate = (date) => {
    const dob = new Date(date)
    return dob.toISOString().slice(0, 10)
  }

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

              {/* date of birth */}
              <div className="flex flex-col mt-1">
                <label htmlFor="dob" className="mb-1">Date of Birth: </label>
                <input type="date" name="" id="dob" value={formatDate(user.dob)} readOnly={true} className="border w-64 pl-2 py-1 rounded-md outline-none"/>
              </div>

              {/* Phone number */}
              <div className="flex flex-col mt-1">
                <label htmlFor="dob" className="mb-1">Phone: </label>
                <input type="phone" name="" id="dob" value={user.phone} readOnly={true} className="border w-64 pl-2 py-1 rounded-md outline-none"/>
              </div>

              <div className="mt-3">
                <button className="px-3 py-2 bg-green-950 text-white rounded-md mr-5">Update Profile</button>
                <button className="px-3 py-2 bg-red-500 text-white rounded-md">Change Password</button>
              </div>

          </div>;

      case "orders":
        return <div className="w-full p-6 bg-white rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-semibold mb-2">Order Summary </h2>
                {orders.length > 0? orders.map((order, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 border p-1 rounded-lg cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium mr-2">Order id:</span>
                      <span className=" text-sm">
                        {order._id}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium mr-2">Payment Status:</span>
                      <span className={order.paymentStatus === 'pending' ? 'text-red-500 text-sm' : 'text-green-600 text-sm'}>
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium mr-2">Order Status:</span>
                      <span className="capitalize text-sm">{order.orderStatus}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium mr-2">Total Items:</span>
                      <span className="text-sm">{order.items.length}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium mr-2">Total Price:</span>
                      <span className="text-sm">${order.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium mr-2">Payment Method:</span>
                      <span className="capitalize text-sm">{order.paymentMethod}</span>
                    </div>
                 
                </div>
                )): <div className="w-full h-12 ">
                      <p>You haven't made any orders yet</p>
                    </div>
                }
              </div>

      case "addresses":
        return <div>
            <h4 className="mb-2 font-semibold">Shipping Address</h4>
            <div className="space-y-2 flex flex-col items-start">
              {/* address line */}
              <input
              defaultValue={address.addressLine} 
              type="text" 
              placeholder="Address Line"
              className="w-full max-w-64 py-2 pl-3 text-black dark:text-white border rounded-lg outline-none"/>
              {/* country */}
              <input 
              defaultValue={address.country}
              type="text" 
              placeholder="Country" 
              className="w-full max-w-64 py-2 pl-3 text-black dark:text-white border rounded-lg outline-none" />
              {/* city */}
              <input 
              defaultValue={address.city}
              type="text" 
              placeholder="State / City"  
              className="w-full max-w-64 py-2 pl-3 text-black dark:text-white border rounded-lg outline-none"/>
              {/* Postal code */}
              <input 
              defaultValue={address.postalCode}
              type="text" 
              placeholder="Postal Code" 
              className="w-full max-w-64 py-2 pl-3 text-black dark:text-white border rounded-lg outline-none"/>
              <button className="px-2 py-1 border rounded-lg">Update</button>
            </div>
          </div>

      case "Logout": 
            return <div className="">
              
            </div>

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