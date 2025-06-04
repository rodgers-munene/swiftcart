import React from 'react'
import { Heart } from 'lucide-react'
import StarRating from '../products/StarRating'
import { formattedPrice } from '../../utils/formatPrice'

const GridProducts = ({ items }) => {
  return (
    <div className="grid sm:w-[95%] max-w-screen-xl mx-auto gap-4
      grid-cols-2 sm:grid-cols-3
      bg-white dark:bg-gray-950 rounded-xl p-2 sm:p-4">
      
      {items ? items.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col border border-gray-200 dark:border-gray-800 p-3 sm:p-4 rounded-lg shadow-sm"
        >
          {/* Discount badge */}
          <p className="absolute top-2 left-2 bg-red-500 rounded-lg px-1 py-0.5 text-[10px] text-white">
            -{parseInt(item.discountPercentage)}%
          </p>

          {/* Wishlist icon */}
          <Heart className="absolute top-2 right-2 text-gray-400 w-4 h-4" />

          {/* Image */}
          <div className="flex justify-center mb-2">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-28 w-28 object-cover rounded-md"
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col justify-between h-full space-y-1">
            <p className="text-sm font-medium line-clamp-1">{item.title}</p>

            <div className="my-1">
              <StarRating rating={item.rating} />
            </div>

            <div className="flex items-center space-x-2">
              <p className="text-xs sm:text-sm font-bold text-red-500">${item.price}</p>
              <p className="text-xs line-through font-medium text-gray-500">
                ${formattedPrice(item.price, item.discountPercentage)}
              </p>
            </div>

            <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
              {item.description}
            </p>

            <button className="mt-2 text-xs border border-blue-600 text-blue-600 px-3 py-1 rounded-md transition">
              Add to Cart +
            </button>
          </div>
        </div>
      )) : "Loading..."}
    </div>
  )
}

export default GridProducts
