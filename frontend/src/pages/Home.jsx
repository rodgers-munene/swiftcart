import { useEffect, useState } from "react";
import GridProducts from "../components/products/gridProducts";
import { getProductsInCategory } from "../services/backendApi";
import { ArrowRight } from "lucide-react";
import FlexProducts from "../components/home/flexProducts";
import Features from "../components/home/Features";
import HomeSlideshow from "../components/home/Slideshow";
import LoadingSkeleton from "../components/loading-skeletons/LoadingSkeleton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [beautyProducts, setBeautyProducts] = useState([]);
  const [fashionProducts, setFashionProducts] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const beautyData = await getProductsInCategory(
        ["beauty", "skin-care"],
        8
      );
      const fashionData = await getProductsInCategory(
        ["mens-shirts", "womens-dresses"],
        8
      );
      const homeData = await getProductsInCategory(
        ["home-decoration", "furniture"],
        8
      );
      setBeautyProducts(beautyData);
      setFashionProducts(fashionData);
      setHomeProducts(homeData);
    };

    getData();
  }, [getProductsInCategory]);

  return (
    <div className="w-screen min-h-screen">
      {/* slide show section */}

      <div className="flex justify-center w-full bg-gray-300 dark:bg-gray-700">
        <HomeSlideshow />
      </div>

      {/* categories section */}

      <div className="flex flex-col items-center w-full min-h-screen bg-gray-300 dark:bg-gray-700">
        {/* services */}
        <div>
          <Features />
        </div>

        {/* title */}
        <div className="flex flex-col items-center justify-around w-full mt-3 ">
          <h1 className="text-2xl font-bold">Top Categories</h1>
        </div>
        {/* beauty section */}
        <div className="flex flex-col items-center mt-3">
          <div className=" w-[90vw] flex justify-between mb-5 items-center">
            <p className="text-sm font-bold sm:text-base lg:text-xl">
              Beauty & Skincare
            </p>
            <button
            onClick={()=> {
              navigate('/categories/beauty')
            }}
             className="flex items-center px-2 py-1 text-sm text-black bg-white rounded-md">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {beautyProducts.length < 1 ? (
            <LoadingSkeleton length={8} />
          ) : (
            <GridProducts items={beautyProducts} />
          )}
        </div>
        {/* only this week section */}
        <div className="my-5">
          <FlexProducts />
        </div>

        {/* fashion section */}
        <div className="flex flex-col items-center w-full mt-5 mb-5">
          <div className=" w-[90vw] flex justify-between mb-5 items-center">
            <p className="text-sm font-bold sm:text-base lg:text-xl">
              Fashion & Accessories
            </p>
            <button
            onClick={()=> {
              navigate('/categories/mens-shirts')
            }}
             className="flex items-center px-2 py-1 text-sm text-black bg-white rounded-md">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {fashionProducts.length < 1 ? (
            <LoadingSkeleton length={8} />
          ) : (
            <GridProducts items={fashionProducts} />
          )}
        </div>

        {/* advert section */}
        <div className="flex justify-center w-full mt-5 mb-5 ">
          <div className="w-[95vw] sm:w-[90vw] h-24 bg-gradient-to-r from-amber-800 to-amber-400 rounded-2xl pl-3 pt-2">
            <h1 className="text-sm font-bold text-green-900 sm:text-base lg:text-2xl">
              In store or online, your health & safety is our top priority
            </h1>
            <p className="pt-3 text-xs text-white md:text-base">
              The only store that makes your life easier, makes you enjoy life
              and makes it better.
            </p>
          </div>
        </div>

        {/* furniture section */}
        <div className="flex flex-col items-center w-full mt-5 mb-5">
          <div className=" w-[90vw] flex justify-between mb-5 items-center">
            <p className="text-sm font-bold sm:text-base lg:text-xl">
              Furniture & Home Accessories
            </p>
            <button
            onClick={()=> {
              navigate('/categories/furniture')
            }} 
            className="flex items-center px-2 py-1 text-sm text-black bg-white rounded-md">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {homeProducts.length < 1 ? (
            <LoadingSkeleton length={8} />
          ) : (
            <GridProducts items={homeProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
