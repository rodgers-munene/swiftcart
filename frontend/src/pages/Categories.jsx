import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductsInCategory } from "../services/backendApi";
import { Slider } from "@mui/material";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import DynamicBreadcrumb from "../components/categories/BreadcrumbNav";
import AllCategories from "../components/home/AllCategories";
import CategoryGrid from "../components/categories/categoryGrid";
import CategoryGridLoading from "../components/loading-skeletons/CategoryGridLoading";

const Categories = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);
  const pathname = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilter = async () => {
    const data = await getProductsInCategory(
      categoryName,
      20,
      value[0],
      value[1]
    );
    console.log(value[0], value[1]);
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getProductsInCategory(categoryName, 20);
      setProducts(data);
      setValue([0, 50000]);
    };

    getData();
  }, [getProductsInCategory, categoryName]);

  const formatCategoryName = (name) => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="w-screen min-h-screen">
      <div className="absolute top-12 md:top-15 left-2 sm:left-6">
        <DynamicBreadcrumb />{" "}
      </div>
      <div className="w-full "></div>
      <div className="flex flex-col px-2 py-4 md:flex-row md:px-6">
        {/* Filter Toggle Button (Visible on small screens) */}
        <div className="flex justify-end mb-4 md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 rounded-lg shadow"
          >
            {showFilters ? (
              <span className="flex items-center gap-1">
                Hide Filters <IoIosArrowUp />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                Show Filters <IoIosArrowDown />
              </span>
            )}
          </button>
        </div>

        {/* Filter Section */}
        <div
          className={`w-full md:w-[28%] md:block mt-10 ${
            showFilters ? "block" : "hidden"
          }`}
        >
          <div className="p-4 mb-4 border-2 border-gray-300 rounded-lg md:mb-0">
            <h1 className="mb-4 text-lg font-semibold text-center">
              Product Filter
            </h1>

            {/* Price Inputs */}
            <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:justify-between">
              <div className="flex-1">
                <label htmlFor="minPrice" className="block text-sm font-medium">
                  Min Price
                </label>
                <input
                  type="number"
                  id="minPrice"
                  onChange={(e) => setValue([Number(e.target.value), value[1]])}
                  value={value[0]}
                  min={0}
                  max={50000}
                  placeholder="0"
                  className="w-full px-2 py-2 text-gray-800 border rounded-lg dark:text-gray-300"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="maxPrice" className="block text-sm font-medium">
                  Max Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  onChange={(e) => setValue([value[0], Number(e.target.value)])}
                  value={value[1]}
                  min={0}
                  max={50000}
                  placeholder="50000"
                  className="w-full px-2 py-2 text-gray-800 border rounded-lg dark:text-gray-300"
                />
              </div>
            </div>

            {/* Slider */}
            <div>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={50000}
                step={1000}
              />

              <div className="flex items-center justify-between mt-2 text-sm">
                <span>
                  Price: ${value[0]} - ${value[1]}
                </span>
                <button
                  onClick={handleFilter}
                  type="button"
                  className="px-4 py-1 transition border rounded-lg hover:bg-blue-600 hover:text-white"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* categories div */}
          <div>
            <AllCategories title={"Change Category"} />
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <h1 className="py-2 pl-8 text-xl font-bold">
            {formatCategoryName(categoryName)}
          </h1>
          {products.length < 1 ? (
            <CategoryGridLoading length={6} />
          ) : (
            <CategoryGrid items={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
