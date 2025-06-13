import { useState } from "react";
import logo from "../../assets/logo.svg";
import Google from "../../assets/google.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Notification from "../../components/global/notification";
import Loader from "../../components/global/Loader";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) return "All fields are mandatory";

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateForm();

    if (err) {
      setMessage(err);
      setShow(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || "Incorrect details!");
        setShow(true);
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.accessToken);
      setToken(data.accessToken);

      // decode the token to get the expiry time and store it in local storage
      const decoded = jwtDecode(data.accessToken);
      const expiresAt = decoded.exp * 1000;
      localStorage.setItem("expiresAt", expiresAt);

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      setMessage("Login Successful");
      setShow(true);
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setMessage("Error logging you in!! Please try again.");
      setShow(true);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
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
            Your fastest shopping experience
          </p>
          <div className="hidden md:block mt-8">
            <div className="w-32 h-1 bg-amber-400 mx-auto mb-3"></div>
            <p className="text-sm text-amber-200 text-center">
              Welcome back! Please login to continue
            </p>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-2/3 p-8 md:p-12 relative">
          {loading && (
            <div className="absolute inset-0 bg-white opacity-80 flex items-center justify-center z-10 rounded-r-2xl">
              <Loader />
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-8">Sign in to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-amber-600 hover:text-amber-700"
              >
                Forgot password?
              </a>
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
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
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="absolute">
        {show && (
          <Notification
            message={message}
            duration={1000}
            onClose={() => setShow(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
