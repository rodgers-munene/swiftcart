const LoadingSkeleton = ( { length }) => {
  return (
    <div className="grid w-[95vw] max-w-screen-xl mx-auto gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 bg-white dark:bg-gray-950 rounded-xl p-2 sm:p-4">
      {Array.from({length: length}).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col p-3 border border-gray-200 rounded-lg shadow-sm dark:border-gray-800 sm:p-4"
        >
          {/* Discount badge skeleton */}
          <div className="absolute w-8 h-4 bg-gray-200 rounded-lg top-2 left-2 dark:bg-gray-800 animate-pulse"></div>

          {/* Wishlist icon skeleton */}
          <div className="absolute w-4 h-4 bg-gray-200 rounded-full top-2 right-2 dark:bg-gray-800 animate-pulse"></div>

          {/* Image skeleton */}
          <div className="flex justify-center mb-2">
            <div className="bg-gray-200 rounded-md dark:bg-gray-800 h-28 w-28 animate-pulse"></div>
          </div>

          {/* Product info skeleton */}
          <div className="flex flex-col justify-between h-full space-y-2">
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-800 animate-pulse"></div>

            {/* skeleton for product rating */}
            <div className="flex my-1 space-x-1">
              {Array.from({length: 5}).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gray-200 rounded-full dark:bg-gray-800 animate-pulse"
                ></div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-10 h-3 bg-gray-200 rounded dark:bg-gray-800 animate-pulse"></div>
              <div className="w-8 h-3 bg-gray-200 rounded dark:bg-gray-800 animate-pulse"></div>
            </div>

            <div className="space-y-1">
              <div className="h-2 bg-gray-200 rounded dark:bg-gray-800 animate-pulse"></div>
              <div className="w-3/4 h-2 bg-gray-200 rounded dark:bg-gray-800 animate-pulse"></div>
            </div>

            <div className="h-6 mt-2 bg-gray-200 rounded-md dark:bg-gray-800 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default LoadingSkeleton;
