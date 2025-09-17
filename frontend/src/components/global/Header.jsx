import { useEffect, useState, useRef } from "react";
import logo from "../../assets/logo.svg";
import Searchbar from "./Searchbar";
import Navbar from "./Navbar";
import { ShoppingCart, User, Heart, MenuIcon, XIcon } from "lucide-react";
import Hamburger from "./Hamburger";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Notification from "./notification";

const Header = () => {
  const { totalInCart } = useCart();
  const [openProfile, setOpenProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notifType, setNotifType] = useState("warning");  
  const navbarRef = useRef(null);
  const { user, token, logout } = useAuth();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const handleOutsideCLick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideCLick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideCLick);
    };
  }, [isOpen, setIsOpen]);


  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

   const toggleProfile = () => {
    setOpenProfile((prev) => !prev);
  };

  return (
    <div className="relative flex items-center justify-between w-screen border-b lg:justify-around ">
      <div
        onClick={() => {
          if (location.pathname !== "/") {
            navigate("/");
          }
        }}
        className="flex items-center md:w-1/3 lg:w-1/6 cursor-pointer"
      >
        <img
          src={logo}
          alt="Logo svg file"
          className="w-8 h-8 md:w-14 md:h-14"
        />
        <h1 className="text-xl md:text-3xl ">SwiftCart</h1>
      </div>

      <div className="hidden w-1/4 lg:block">
        <Navbar />
      </div>

      <div className="flex items-center mr-2 lg:hidden">
        <Searchbar />
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            <User />
          </button>
        </div>
        <button onClick={toggleNavbar}>
          {isOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="hidden lg:block lg:w-1/3 ">
        <div className="flex items-center justify-around w-full">
          <Searchbar />
          {/* wishlist */}
          <button className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700">
            <Heart />
          </button>

          {/* cart */}
          <button
            onClick={() => {
              if (token && user) {
                navigate("/cart");
              } else {
                setMessage("Login to access the cart!");
                setShow(true);
              }
            }}
            className="relative p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            <ShoppingCart />
            <p className="absolute right-1 -top-2 ">{totalInCart}</p>
          </button>

            {/* profile button */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              <User />
            </button>
          </div>

          <button onClick={toggleNavbar} className="lg:hidden">
            {isOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* profile component */}

      {openProfile && (
        <div
        
          className={`absolute right-32 sm:right-36 top-10 md:top-14 z-50 w-24 h-auto bg-gray-400 rounded-lg dark:bg-gray-800`}
        >
          <div className="w-56 p-2 text-sm text-gray-700 bg-white border rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-200">
            {token === null ? (
              <>
                <Link
                  to="/login"
                  onClick={toggleProfile}
                  className="block px-4 py-2 transition-colors rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </Link>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <Link
                  to="/signup"
                  onClick={toggleProfile}
                  className="block px-4 py-2 transition-colors rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Signup
                </Link>
                <hr className="my-1 border-gray-200 dark:border-gray-700"/>
                <button
                  onClick={toggleProfile}
                  className="flex items-center w-full justify-between it px-4 py-2 transition-colors rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Close <XIcon className="w-6 h-6" />
                </button>
              </>
            ) : (
              <>
                <div className="px-4 py-2 text-xs text-gray-500">
                  {user.firstName} {user.lastName}
                </div>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={() => {
                    navigate("/profile");
                    toggleProfile();
                  }}
                  className="w-full px-4 py-2 text-left transition-colors rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View Profile
                </button>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                    toggleProfile();
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 transition-colors rounded hover:bg-red-400 dark:hover:bg-red-800 hover:text-white"
                >
                  Logout
                </button>
                
                <hr className="my-1 border-gray-200 dark:border-gray-700"/>
                <button
                  onClick={toggleProfile}
                  className="flex items-center w-full justify-between it px-4 py-2 transition-colors rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Close <XIcon className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div
        ref={navbarRef}
        onClick={toggleNavbar}
        className={`absolute z-50 right-0 transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? "top-10 md:top-14" : "-top-[30rem]"
        }`}
      >
        <Hamburger />
      </div>

      <div className="absolute">
        {show && (
          <Notification
            message={message}
            duration={1000}
            type={notifType}
            onClose={() => setShow(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
