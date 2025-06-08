import React, { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <div><h2 className="text-xl font-semibold mb-4">Account Details</h2><p>Update your personal information here.</p></div>;
      case "orders":
        return <div><h2 className="text-xl font-semibold mb-4">Your Orders</h2><p>View and manage your orders.</p></div>;
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