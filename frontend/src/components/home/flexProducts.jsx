import { ArrowRight } from "lucide-react";

const FlexProducts = () => {
  return (
    <div className="flex overflow-x-auto overflow-y-hidden w-screen sm:w-[95vw] p-2 justify-between">
      {/* groceries */}
      <div className="flex bg-white dark:bg-gray-950 rounded-lg min-w-[20rem] sm:min-w-[26rem] h-44 sm:h-52 relative mr-2">
        <div className=" flex flex-col justify-around pl-2 items-start">
          <p className="text-amber-500">Only this week</p>
          <h1 className="sm:text-xl font-bold w-2/3">
            We make your grocery shopping more exciting
          </h1>
          <p className="text-gray-500">A family place for grocery</p>
          <button className="flex items-center bg-gray-100 dark:bg-gray-900 py-2 px-2 rounded-lg">
            Shop Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute  -right-6 sm:right-0 ">
          <div className="relative overflow-hidden top-4">
            <img
              className="w-44 h-44 absolute -top-12 right-6"
              src="https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp"
              alt="apples"
            />
            <img
              className="w-44 h-44"
              src="https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp"
              alt="cucumber"
            />
          </div>
        </div>
      </div>

      {/* Electronics */}
      <div className="flex bg-white dark:bg-gray-950 rounded-lg min-w-[20rem] sm:min-w-[26rem] h-44 sm:h-52 relative overflow-hidden mr-2">
        <div className=" flex flex-col justify-around pl-2 items-start">
          <p className="text-amber-500">Only this week</p>
          <h1 className="sm:text-xl font-bold ">
            We provide you the best quality products
          </h1>
          <p className="text-gray-500">Smart living made simple</p>
          <button className="flex items-center bg-gray-100 dark:bg-gray-900 py-2 px-2 rounded-lg">
            Shop Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="relative w-[60%] ">
          <img
            className="w-32 h-32 absolute top-0 "
            src="https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp"
            alt="macbook"
          />

          <img
            className="w-28 h-28 absolute bottom-0"
            src="https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp"
            alt="iphone-13"
          />

          <img
            className=" w-28 h-28 absolute bottom-0 right-0"
            src="https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp"
            alt="airpod-max"
          />
        </div>
      </div>

      {/* furniture and home deco */}
      <div className="flex bg-white dark:bg-gray-950 rounded-lg min-w-[20rem] sm:min-w-[26rem] h-44 sm:h-52 relative overflow-hidden">
        <div className=" flex flex-col justify-around pl-2 items-start">
          <p className="text-amber-500">Only this week</p>
          <h1 className="sm:text-xl font-bold ">
            Style and comfort, made simple.
          </h1>
          <p className="text-gray-500">Comfort and style for every home.</p>
          <button className="flex items-center bg-gray-100 dark:bg-gray-900 py-2 px-2 rounded-lg">
            Shop Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="relative w-[60%] ">
          <img
            className="w-32 h-32 absolute top-0 "
            src="https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp"
            alt="bed"
          />

          <img
            className="w-28 h-28 absolute bottom-0"
            src="https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp"
            alt="cabinet"
          />

          <img
            className=" w-28 h-28 absolute bottom-0 right-0"
            src="https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp"
            alt="chair"
          />
        </div>
      </div>
    </div>
  );
};

export default FlexProducts;
