import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../services/orderFunction";
import { getUserAddress } from "../services/userApi";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await getOrders(user.user_id, token);
      const addressData = await getUserAddress(user.user_id, token);
      setOrders(orderData.data);
      setAddress(addressData.data[0]);
      console.log(addressData.data);
    };

    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  const formatDate = (date) => {
    const dob = new Date(date);
    return dob.toISOString().slice(0, 10);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="p-6 bg-white shadow-md rounded-xl max-w-xl mx-auto dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Account Details
            </h2>

            {/* First and Last Name */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex flex-col flex-1 min-w-[150px]">
                <label
                  htmlFor="firstName"
                  className="mb-1 text-sm text-gray-600 dark:text-gray-200"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  readOnly
                  className="border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-700 bg-gray-50 text-black"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-[150px]">
                <label
                  htmlFor="lastName"
                  className="mb-1 text-sm text-gray-600 dark:text-gray-200"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={user.lastName}
                  readOnly
                  className="border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-700 bg-gray-50 text-black"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-1 text-sm text-gray-600 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                readOnly
                className="border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-700 bg-gray-50 text-black"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col mb-4">
              <label htmlFor="dob" className="mb-1 text-sm text-gray-600 dark:text-gray-200">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                defaultValue={user.dob? formatDate(user.dob): ""}
                
                className="border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-700 bg-gray-50 text-black"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col mb-6">
              <label htmlFor="phone" className="mb-1 text-sm text-gray-600 dark:text-gray-200">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                defaultValue={user.phone? user.phone: ""}
                className="border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-700 bg-gray-50 text-black"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-green-800 hover:bg-green-900 text-white rounded-lg transition-colors">
                Update Profile
              </button>
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                Change Password
              </button>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="w-full p-6 bg-white rounded-lg shadow-md space-y-4 dark:bg-gray-800 mb-5">
            <h2 className="text-2xl font-semibold mb-2">Order Summary </h2>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 border p-1 rounded-lg cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium mr-2">Order id:</span>
                    <span className=" text-sm">{order._id}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium mr-2">Payment Status:</span>
                    <span
                      className={
                        order.paymentStatus === "pending"
                          ? "text-red-500 text-sm"
                          : "text-green-600 text-sm"
                      }
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium mr-2">Order Status:</span>
                    <span className="capitalize text-sm">
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium mr-2">Total Items:</span>
                    <span className="text-sm">{order.items.length}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium mr-2">Total Price:</span>
                    <span className="text-sm">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium mr-2">Payment Method:</span>
                    <span className="capitalize text-sm">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-12 ">
                <p>You haven't made any orders yet</p>
              </div>
            )}
          </div>
        );

      case "addresses":
        return (
          <div className="p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl max-w-sm w-full mx-auto">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Shipping Address
            </h4>

            <div className="space-y-4">
              {/* Address Line */}
              <input
                defaultValue={address.addressLine}
                type="text"
                placeholder="Address Line"
                className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-700"
              />

              {/* Country */}
              <input
                defaultValue={address.country}
                type="text"
                placeholder="Country"
                className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-700"
              />

              {/* City */}
              <input
                defaultValue={address.city}
                type="text"
                placeholder="State / City"
                className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-700"
              />

              {/* Postal Code */}
              <input
                defaultValue={address.postalCode}
                type="text"
                placeholder="Postal Code"
                className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-700"
              />

              {/* Update Button */}
              <button className="w-full py-2 bg-green-800 text-white text-sm font-medium rounded-lg hover:bg-green-900 transition-colors">
                Update
              </button>
            </div>
          </div>
        );

      case "Logout":
        return <div className=""></div>;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r p-4 space-y-4 dark:bg-gray-700">
          <button
            className={`w-full text-left p-2 rounded ${
              activeTab === "account"
                ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Account Details
          </button>
          <button
            className={`w-full text-left p-2 rounded ${
              activeTab === "orders"
                ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`w-full text-left p-2 rounded ${
              activeTab === "addresses"
                ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
            onClick={() => setActiveTab("addresses")}
          >
            Addresses
          </button>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4 sm:p-6 dark:bg-gray-700">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
