import React from "react";

const CartSkeleton = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-950 md:p-8">
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl lg:grid-cols-3">
        {/* Left Side - Cart Items */}
        <div className="space-y-6 lg:col-span-2">
          <div className="w-10 h-4 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
          <div className="w-6 h-4 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>

          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between p-4 bg-gray-200 shadow-md dark:bg-gray-800 rounded-xl sm:flex-row animate-pulse"
              >
                <div className="flex items-center w-full gap-4 md:w-auto">
                  <div className="object-cover w-24 h-24 rounded animate-pulse" />
                  {/* title category and color and weight details */}
                  <div className="p-3">
                    <div className="h-3 bg-gray-200 w-7 dark:bg-gray-800 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 w-14 dark:bg-gray-800 animate-bounce"></div>
                    <div className="text-sm text-gray-800 dark:text-gray-200"></div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-6 mt-4 md:mt-0">
                  <div className="w-5 h-4 bg-gray-200 dark:bg-gray-800"></div>
                  <div className="flex items-center space-x-4 animate-pulse">
                    {/* Quantity controls skeleton */}
                    <div className="flex items-center bg-gray-200 border rounded dark:bg-gray-800">
                      <div className="w-6 h-6 px-2 py-1 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="w-4 h-4 px-3 mx-1 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="w-6 h-6 px-2 py-1 bg-gray-300 dark:bg-gray-700"></div>
                    </div>

                    {/* Price skeleton */}
                    <div className="w-12 h-4 bg-gray-200 rounded dark:bg-gray-800"></div>

                    {/* Delete button skeleton */}
                    <div className="w-5 h-5 bg-gray-200 rounded dark:bg-gray-800"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="p-6 space-y-6 bg-white dark:bg-gray-800 border max-h-[36rem] shadow rounded-xl animate-pulse">
          {/* Shipping Address Section Skeleton */}
          <div>
            <div className="w-32 h-6 mb-2 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="space-y-2">
              {/* Address Line Skeleton */}
              <div className="w-full h-10 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
              {/* Country Skeleton */}
              <div className="w-full h-10 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
              {/* City Skeleton */}
              <div className="w-full h-10 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
              {/* Postal Code Skeleton */}
              <div className="w-full h-10 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
              {/* Update Button Skeleton */}
              <div className="w-20 h-8 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
            </div>
          </div>

          {/* Cart Total Section Skeleton */}
          <div className="p-4 space-y-2 bg-yellow-100 dark:bg-gray-700 rounded-xl">
            <div className="w-24 h-6 bg-yellow-200 rounded dark:bg-gray-600"></div>

            {/* Subtotal Skeleton */}
            <div className="flex justify-between">
              <div className="w-20 h-4 bg-yellow-200 rounded dark:bg-gray-600"></div>
              <div className="w-12 h-4 bg-yellow-200 rounded dark:bg-gray-600"></div>
            </div>

            {/* Shipping Skeleton */}
            <div className="flex justify-between">
              <div className="w-16 h-4 bg-yellow-200 rounded dark:bg-gray-600"></div>
              <div className="w-8 h-4 bg-yellow-200 rounded dark:bg-gray-600"></div>
            </div>

            {/* Discount Skeleton */}
            <div className="flex justify-between">
              <div className="w-16 h-4 bg-yellow-200 rounded dark:bg-gray-600"></div>
              <div className="w-12 h-4 bg-yellow-200 rounded dark:bg-gray-600"></div>
            </div>

            {/* Total Skeleton */}
            <div className="flex justify-between">
              <div className="w-16 h-4 bg-yellow-200 rounded dark:bg-gray-600"></div>
              <div className="w-12 h-4 bg-yellow-200 rounded dark:bg-gray-600"></div>
            </div>

            {/* Checkout Button Skeleton */}
            <div className="w-full h-10 mt-3 bg-yellow-200 rounded-lg dark:bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
