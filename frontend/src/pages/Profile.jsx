import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../services/orderFunction";
import { getUserAddress, updateUserAddress } from "../services/userApi";
import Notification from "../components/global/notification";
import { formatDate } from "../utils/formatDate";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { user, token, updateUserInfo, message, setMessage, setShow, show } =
    useAuth();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState({
    _id: "",
    addressLine: "",
    country: "",
    city: "",
    postalCode: "",
  });

  // Defensive: handle user not loaded yet
  const defaultValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    birthDate: user?.dob || "",
    phone: user?.phone || "",
  };
  const [updatableData, setUpdatableData] = useState(defaultValues);

  // Defensive: handle address not loaded yet
  const [updatableAddress, setUpdatableAddress] = useState({
    addressLine: address.addressLine || "",
    country: address.country || "",
    city: address.city || "",
    postalCode: address.postalCode || "",
  });

  // Sync updatableData with user changes
  useEffect(() => {
    setUpdatableData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      birthDate: user?.dob || "",
      phone: user?.phone || "",
    });
  }, [user]);

  // Sync updatableAddress with address changes
  useEffect(() => {
    setUpdatableAddress({
      addressLine: address?.addressLine || "",
      country: address?.country || "",
      city: address?.city || "",
      postalCode: address?.postalCode || "",
    });
  }, [address]);

  // Check for any change in the input fields and return true or false
  const isUnchanged =
    user?.firstName === updatableData.firstName &&
    user?.lastName === updatableData.lastName &&
    user?.dob === updatableData.birthDate &&
    user?.phone === updatableData.phone;

  // Check for updated user address field
  const isAddressUnchanged =
    address?.addressLine === updatableAddress.addressLine &&
    address?.country === updatableAddress.country &&
    address?.city === updatableAddress.city &&
    address?.postalCode === updatableAddress.postalCode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUpdatableAddress((prev) => ({ ...prev, [name]: value }));
  };

  // get user orders and address
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !token) return;
      const orderData = await getOrders(user.user_id, token);
      const addressData = await getUserAddress(user.user_id, token);
      setOrders(orderData.data || []);
      setAddress(
        addressData.data?.[0] || {
          _id: "",
          addressLine: "",
          country: "",
          city: "",
          postalCode: "",
        }
      );
    };

    fetchOrders();
  }, [user, token]);

  const handleUpdateAddress = async (addressId) => {
    const res = await updateUserAddress(
      user.user_id,
      addressId,
      token,
      updatableAddress
    );
    if (res.success) {
      setMessage("Address info successfully updated!");
      setShow(true);

      setAddress(res.data);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="p-6 bg-white shadow-md rounded-xl max-w-xl mx-auto dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
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
                  name="firstName"
                  value={updatableData.firstName}
                  onChange={handleChange}
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
                  name="lastName"
                  value={updatableData.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-700 bg-gray-50 text-black"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="mb-1 text-sm text-gray-600 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user?.email || ""}
                readOnly
                className="border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-700 bg-gray-50 text-black"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="dob"
                className="mb-1 text-sm text-gray-600 dark:text-gray-200"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="birthDate"
                value={
                  updatableData.birthDate
                    ? formatDate(updatableData.birthDate)
                    : ""
                }
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-700 bg-gray-50 text-black"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="phone"
                className="mb-1 text-sm text-gray-600 dark:text-gray-200"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={updatableData.phone}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-700 bg-gray-50 text-black"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  updateUserInfo(updatableData);
                }}
                disabled={isUnchanged}
                className={`px-4 py-2  text-white rounded-lg transition-colors  ${
                  isUnchanged
                    ? "bg-gray-500 opacity-50 !cursor-not-allowed"
                    : "cursor-pointer bg-green-800"
                }`}
              >
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
                value={updatableAddress.addressLine}
                name="addressLine"
                onChange={handleAddressChange}
                type="text"
                placeholder="Address Line"
                className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-700"
              />

              {/* Country */}
              <input
                value={updatableAddress.country}
                name="country"
                onChange={handleAddressChange}
                type="text"
                placeholder="Country"
                className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-700"
              />

              {/* City */}
              <input
                value={updatableAddress.city}
                name="city"
                onChange={handleAddressChange}
                type="text"
                placeholder="State / City"
                className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-700"
              />

              {/* Postal Code */}
              <input
                value={updatableAddress.postalCode}
                name="postalCode"
                onChange={handleAddressChange}
                type="text"
                placeholder="Postal Code"
                className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-700"
              />

              {/* Update Button */}
              <button
                onClick={() => {
                  handleUpdateAddress(address._id);
                }}
                disabled={isAddressUnchanged}
                className={`w-full py-2 text-white text-sm font-medium rounded-lg  transition-colors ${
                  isAddressUnchanged
                    ? "bg-gray-500 opacity-50 !cursor-not-allowed"
                    : "cursor-pointer bg-green-800"
                }`}
              >
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
        <div className="w-full md:w-3/4 sm:p-6 dark:bg-gray-700">
          {renderContent()}
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

export default Profile;
