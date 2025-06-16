import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import Google from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../../components/global/notification";
import Loader from "../../components/global/Loader";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const Signup = () => {
  const [formData, setFormData] = useState({
    //get data from the form on submit
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);

  // validation form data

  const validateForm = () => {
    const { password, confirmPassword, email, firstName, lastName } = formData;

    if (password !== confirmPassword) return "Passwords don't match";
    if (!password || !confirmPassword || !email || !firstName || !lastName)
      return "All fields are required!!";
    if (!/[A-Za-z]/.test(password))
      return "Password must contain at least one letter";
    if (!/\d/.test(password))
      return "Password must contain at least one number";
    if (!/[^A-Za-z0-9]/.test(password))
      return "Password must contain at least one special character";

    return null; //no validation error
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateForm();

    if (err) {
      console.log(err);
      setMessage(err);
      setShow(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || "Registration Failed");
        setShow(true);
        return;
      }

      setMessage("Registration successful, Please Login");
      setShow(true);
      console.log("Registration successful, please login to continue!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Branding Section */}
        <div className="bg-gradient-to-br from-amber-600 to-amber-800 w-full md:w-1/3 p-8 flex flex-col items-center justify-center text-white space-y-6">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="SwiftCart Logo"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <h1 className="text-3xl font-bold">SwiftCart</h1>
          </div>
          <p className="text-center text-amber-100">
            Join our shopping community
          </p>
          <div className="hidden md:block mt-8">
            <div className="w-32 h-1 bg-amber-400 mx-auto mb-3"></div>
            <p className="text-sm text-amber-200 text-center">
              Create your account to get started
            </p>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="w-full md:w-2/3 p-8 md:p-12 relative">
          {loading && (
            <div className="absolute inset-0 bg-white opacity-80 flex items-center justify-center z-10 rounded-r-2xl">
              <Loader />
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Create Account
          </h2>
          <p className="text-gray-500 mb-8">
            Join us for the best shopping experience
          </p>

          <form className="space-y-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1 space-y-1">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="johndoe@example.com"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handleSubmit}
              type="button"
              disabled={loading}
              className={`w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"
              }`}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg flex justify-center items-center space-x-2 text-gray-700 hover:bg-gray-50 transition-all duration-300"
            >
              <img src={Google} alt="Google logo" className="w-5 h-5" />
              <span>Google</span>
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="absolute">
        {show && (
          <Notification
            message={message}
            duration={1500}
            onClose={() => setShow(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Signup;

// {showPopup && (
//                 <div className="fixed left-0 sm:left-1/3 top-0 w-full sm:w-1/3 z-10 bg-gray-600">
//                 <div className="bg-gray-600 p-4 rounded-lg text-center w-full">
//                     <p className="text-lg font-bold text-green-600">{message}</p>
//                     <button
//                     onClick={() => setShowPopup(false)}
//                     className=" bg-gray-900 text-white p-2 rounded"
//                     >
//                     Close
//                     </button>
//                     <div className='w-full h-1 bg-green-500 absolute bottom-0 left-0'></div>
//                 </div>
//                 </div>
//             )}
