import React, { useEffect, useState } from "react";
import { getHighestDiscountedProducts } from "../../services/backendApi";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import StarRating from "../products/StarRating";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import Notification from "../global/notification";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const FlashDeals = () => {
  const [deals, setDeals] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const navigate = useNavigate();
  const { handleAddToCart } = useCart();
  const [notifType, setNotifType] = useState("warning");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const { token } = useAuth();

  const formatPrice = (price, discount) => {
    const discounted = price - (price * discount) / 100;
    return discounted.toFixed(2);
  };

  useEffect(() => {
    const fetchDeals = async () => {
      const fetchedDeals = await getHighestDiscountedProducts(5);
      setDeals(fetchedDeals);
    };

    fetchDeals();
  }, []);

  //countdown functionality
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0); // Midnight
      const diff = tomorrow - now;

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <section className="py-10 w-[93vw] scrollbar-hide">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Flash Sales</h2>
        {/* Countdown */}
        <div className="flex gap-2 mt-2">
          <TimeBox value={timeLeft.hours} label="H" />
          <span className="text-lg font-bold">:</span>
          <TimeBox value={timeLeft.minutes} label="M" />
          <span className="text-lg font-bold">:</span>
          <TimeBox value={timeLeft.seconds} label="S" />
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {deals.map((item, index) => (
          <div
            onClick={() => {
              navigate(
                `/categories/products/${item._id}/${slugify(item.title, {
                  lower: true,
                  trim: true,
                })}`
              );
            }}
            key={index}
            className="
    relative 
    min-w-[220px] h-[240px] 
    sm:min-w-[250px] sm:h-[280px] 
    bg-white dark:bg-gray-900 
    shadow-sm border rounded
    p-2 flex flex-col mb-4 cursor-pointer
  "
          >
            {/* Discount Badge */}
            <span className="bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded absolute">
              -{Math.round(item.discountPercentage)}%
            </span>

            {/* Product Image */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-24 sm:h-28 object-contain mb-2 sm:mb-3"
            />

            {/* Product Info */}
            <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 line-clamp-2">
              {item.title}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <span className="text-sm sm:text-lg font-bold text-red-500">
                ${formatPrice(item.price, item.discountPercentage)}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                ${item.price}
              </span>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-1 text-yellow-400 text-xs sm:text-sm mb-1 sm:mb-2">
              <StarRating rating={item.rating} />
              <span className="text-gray-500 text-[10px] sm:text-xs">
                ({item.reviews.length})
              </span>
            </div>

            {/* Add to Cart */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevents the click from reaching the parent div
                if (token !== null) {
                  handleAddToCart(item._id, 1);
                  setMessage("Product Added to Cart");
                  setShow(true);
                  setNotifType("success");
                } else {
                  setMessage("Login to Access cart!");
                  setShow(true);
                }
              }}
              className="
      bg-gray-700 text-white 
      py-1.5 sm:py-2 
      text-xs sm:text-sm 
      rounded mt-auto 
      hover:bg-gray-800 transition
    "
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center items-center mt-5">
        <button className="px-3 py-2 bg-red-500 text-white rounded shadow-xl">View All Products</button>
      </div>

      {show && (
        <Notification
          message={message}
          duration={800}
          type={notifType}
          onClose={() => setShow(false)}
        />
      )}
    </section>
  );
};

function TimeBox({ value, label }) {
  return (
    <div className="flex items-center bg-red-700 text-white px-1 py-1 rounded-md">
      <span className="text-sm font-bold">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-sm font-bold uppercase">{label}</span>
    </div>
  );
}

export default FlashDeals;
