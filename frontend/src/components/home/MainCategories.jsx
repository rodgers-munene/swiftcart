import { useEffect, useState } from "react";
import { getCategories } from "../../services/backendApi";
import { useNavigate } from "react-router-dom";

const MainCategories = ({ title }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories(8);
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, [getCategories]);

  // format the category names using regex
  const formatCategoryName = (name) => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="hidden xl:block">
      <div className="dark:bg-gray-900 pb-1 overflow-y-hidden overflow-x-hidden h-96 border-r">
        <ul className="w-52">
          {categories.length < 1
            ? Array.from({ length: 10 }).map((_, index) => (
                <li
                  key={index}
                  className="h-8 mb-1 text-gray-700 bg-gray-300 dark:bg-gray-700 animate-pulse"
                ></li>
              ))
            : categories.map((category) => (
                <li
                  onClick={() => {
                    navigate(`/categories/${category}`);
                  }}
                  key={category}
                  className="py-2.5 pl-4 text-sm font-medium text-gray-700 transition cursor-pointer dark:text-gray-100 hover:text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <p>{formatCategoryName(category)}</p>
                </li>
              ))}

          {categories.length > 1 && (
            <li
              onClick={() => {
                navigate(`/categories`);
              }}
              className="py-2.5 pl-4 text-sm font-medium text-gray-700 transition cursor-pointer dark:text-gray-100 hover:text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <p>Other Categories</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainCategories;
