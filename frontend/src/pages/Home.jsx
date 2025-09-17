import { useEffect, useState } from "react";
import GridProducts from "../components/products/gridProducts";
import {
  getHighestDiscountedProducts,
  getProducts,
  getTopRatedProducts,
} from "../services/backendApi";
import { ArrowRight } from "lucide-react";
import Features from "../components/home/Features";
import HomeSlideshow from "../components/home/Slideshow";
import LoadingSkeleton from "../components/loading-skeletons/LoadingSkeleton";
import { useNavigate } from "react-router-dom";
import MainCategories from "../components/home/MainCategories";
import FlashDeals from "../components/home/FlashDeals";
import ProductAd from "../components/home/AdSection";

const Home = () => {
  const [topRated, setTopRated] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [adProduct, setAdProduct] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const topRated = await getTopRatedProducts(4);
      const featuredData = await getProducts(20);

      const adProd = await getHighestDiscountedProducts(1);

      setAdProduct(adProd);
      setTopRated(topRated);
      setFeaturedProducts(featuredData);
    };

    getData();
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center">
      {/* slide show section */}

      <div className="relative flex justify-between mb-10 w-[90%] pt-6 max-w-7xl">
        <MainCategories />
        <HomeSlideshow />
      </div>

      {/* categories section */}

      <div className="flex flex-col items-center w-full min-h-screen">
        {/* services */}
        <div>
          <FlashDeals />
        </div>

        {/* top rated section */}
        <div className="flex flex-col items-center mt-3">
          <div className=" w-[90vw] flex justify-between mb-5 items-center">
            <p className="text-sm font-bold sm:text-base lg:text-2xl">
              Top Trending Products
            </p>
            <button
              onClick={() => {
                navigate("/categories/beauty");
              }}
              className="flex items-center px-2 py-1 text-sm text-black bg-white rounded-md"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {topRated.length < 1 ? (
            <LoadingSkeleton length={4} />
          ) : (
            <GridProducts items={topRated} />
          )}
        </div>

        {/* advert section */}
        <ProductAd product={adProduct} />

        {/* featured producs */}
        <div className="flex flex-col items-center w-full mt-5 mb-5">
          <div className="w-[90vw] flex justify-center mb-8 items-center">
            <h2 className="relative text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 tracking-wide">
              Featured Products
              <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
            </h2>
          </div>

          {featuredProducts.length < 1 ? (
            <LoadingSkeleton length={8} />
          ) : (
            <GridProducts items={featuredProducts} />
          )}
        </div>

        {/* our ecommerce features */}
        <Features />
      </div>
    </div>
  );
};

export default Home;
