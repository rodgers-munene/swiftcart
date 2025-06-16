import { Heart } from "lucide-react";
import StarRating from "../products/StarRating";
import { formattedPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { useCart } from "../../context/CartContext";
import Notification from "../global/notification";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const CategoryGrid = ({ items }) => {
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const { token } = useAuth();

  return (
    <div
      className="grid sm:w-[95%] max-w-screen-xl mx-auto gap-4
      grid-cols-2 sm:grid-cols-3
      bg-white dark:bg-gray-950 rounded-xl p-2 sm:p-4"
    >
      {items
        ? items.map((item, index) => (
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
              className="relative flex flex-col p-3 border border-gray-200 rounded-lg shadow-sm cursor-pointer dark:border-gray-800 sm:p-4"
            >
              {/* Discount badge */}
              <p className="absolute top-2 left-2 bg-red-500 rounded-lg px-1 py-0.5 text-[10px] text-white">
                -{parseInt(item.discountPercentage)}%
              </p>

              {/* Wishlist icon */}
              <Heart className="absolute w-4 h-4 text-gray-400 top-2 right-2" />

              {/* Image */}
              <div className="flex justify-center mb-2">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="object-cover rounded-md h-28 w-28"
                />
              </div>

              {/* Product info */}
              <div className="flex flex-col justify-between h-full space-y-1">
                <p className="text-sm font-medium line-clamp-1">{item.title}</p>

                <div className="my-1">
                  <StarRating rating={item.rating} />
                </div>

                <div className="flex items-center space-x-2">
                  <p className="text-xs font-bold text-red-500 sm:text-sm">
                    ${item.price}
                  </p>
                  <p className="text-xs font-medium text-gray-500 line-through">
                    ${formattedPrice(item.price, item.discountPercentage)}
                  </p>
                </div>

                <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                  {item.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevents the click from reaching the parent div
                    if (token !== null) {
                      handleAddToCart(item._id, 1);
                      setMessage("Product Added to Cart");
                      setShow(true);
                    } else {
                      setMessage("Login to Access cart");
                      setShow(true);
                      setTimeout(() => {
                        navigate("/login");
                      }, 1000);
                    }
                  }}
                  className="z-10 px-3 py-1 mt-2 text-xs text-blue-600 transition border border-blue-600 rounded-md hover:bg-gray-200"
                >
                  Add to Cart +
                </button>
              </div>
            </div>
          ))
        : "Loading..."}

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

export default CategoryGrid;
