import { useEffect, useRef, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Searchbar = () => {
  const [isSearchBar, setIsSearchBar] = useState(false);
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (event) => {
      // check if click occurs outside of the search component
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchBar(false); //hide the search bar
        setQuery("");
      }
    };

    if (isSearchBar) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isSearchBar, setIsSearchBar]);

  const toggleSearch = () => {
    setIsSearchBar((prev) => !prev);
  };


  // debounce live search effect
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/products/search?query=${encodeURIComponent(
            query
          )}`
        );
        if (!res.ok) throw new Error("Search Failed!");
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        setError("Failed to fetch results.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timeout);
  }, [query]);

  // search handle
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:5001/api/products/search?query=${encodeURIComponent(
          query
        )}`
      );
      if (!res.ok) throw new Error("Search Failed!");

      const data = await res.json();
      setResults(data.products) || [];
      console.log(data);
    } catch (error) {
      setError("Failed to fetch results.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="md:hidden flex">
        {/* Search Bar */}
        <div
          ref={searchRef}
          className={`fixed top-4 left-1/2 -translate-x-1/2 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 
      bg-white dark:bg-gray-800 rounded-xl min-h-32 transition-all duration-300 
      shadow-lg z-50 ${
        !isSearchBar
          ? "opacity-0 scale-95 pointer-events-none"
          : "opacity-100 scale-100"
      }
      border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-opacity-90`}
        >
          <div className="relative w-full h-full p-4 flex flex-col">
            <form
              className="flex items-center w-full mb-2"
              onSubmit={handleSearch}
            >
              <div className="relative flex-grow flex items-center">
                <SearchIcon className="absolute left-3 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-700 h-12 w-full pl-10 pr-4 outline-none 
              rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
              focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Search for Products, Categories or Brands"
                />
              </div>
              <button
                type="submit"
                className="ml-2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
            transition-colors duration-200 flex items-center justify-center"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-2">
              {loading && <div className="text-blue-500">Searching</div>}
              {error && <div className="text-red-500">{error}</div>}
              {results.length > 0 && (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {results.map((item, index) => (
                    <li
                      onClick={() => {
                        navigate(
                          `/categories/products/${item._id}/${item.title}`
                        );
                        setIsSearchBar(false);
                        setQuery("");
                      }}
                      key={index}
                      className="py-2 cursor-pointer "
                    >
                      <span className="font-medium">{item.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end items-center mt-auto ">
              <button
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
            text-gray-700 dark:text-gray-300 rounded-lg flex items-center font-medium 
            transition-colors duration-200"
                onClick={() => {
                  toggleSearch();
                  setQuery("");
                }}
              >
                Close <XIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={toggleSearch}
        >
          <SearchIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/*large screens search functionality*/}
      <div className="hidden md:block relative w-full max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="w-72 py-2 pl-4 pr-10 border border-gray-300 focus:outline-none placeholder-gray-400"
          />
          <button type="submit">
              <SearchIcon className="absolute right-3 top-2.5 h-5 w-5 text-black dark:text-white cursor-pointer" />
          </button>
          
        </form>

        <div className="absolute px-2 z-50 bg-white dark:bg-gray-700 w-full">
              {loading && <div className="text-blue-500">Searching</div>}
              {error && <div className="text-red-500">{error}</div>}
              {results.length > 0 && (
                <ul className="divide-y dark:divide-gray-200 divide-gray-700">
                  {results.map((item, index) => (
                    <li
                      onClick={() => {
                        navigate(
                          `/categories/products/${item._id}/${item.title}`
                        );
                        setIsSearchBar(false);
                        setQuery("");
                      }}
                      key={index}
                      className="py-2 cursor-pointer "
                    >
                      <span className="font-medium">{item.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
      </div>
    </div>
  );
};

export default Searchbar;
