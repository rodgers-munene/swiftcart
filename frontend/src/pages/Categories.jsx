import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsInCategory } from '../services/backendApi'
import GridProducts from '../components/categories/categoryGrid'
import { getCategories } from '../services/backendApi'
import { Slide, Slider } from '@mui/material'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import DynamicBreadcrumb from '../components/categories/BreadcrumbNav'


const Categories = () => {
  const {categoryName} = useParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [value, setValue] = useState([0, 50000])
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }


  useEffect(() => {
    const getData = async() => {
      const data = await getProductsInCategory(categoryName, 10)
      const categoryData = await getCategories()
      setCategories(categoryData);
      setProducts(data)
    }

    getData()
  }, [getProductsInCategory])

  const formatCategoryName = (name) => {
      return name
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  return (
    <div className='min-h-screen w-screen'>
      <div className='absolute top-12 md:top-15 left-2 sm:left-6'><DynamicBreadcrumb /> </div>
      <div className=' w-full'>

      </div>
     <div className="flex flex-col md:flex-row px-2 md:px-6 py-4">
      {/* Filter Toggle Button (Visible on small screens) */}
      <div className="md:hidden mb-4 flex justify-end">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2  text-white rounded-lg shadow"
        >
          {showFilters ? (<span className="flex items-center gap-1">
                Hide Filters <IoIosArrowUp />
              </span>)  : 
              (
            <span className="flex items-center gap-1">
              Show Filters <IoIosArrowDown />
            </span>
          )}
        </button>
      </div>

      {/* Filter Section */}
      <div
        className={`w-full md:w-[28%] md:block mt-10 ${
          showFilters ? 'block' : 'hidden'
        }`}
      >
        
        <div className="border-2 border-gray-300 rounded-lg p-4 mb-4 md:mb-0">
          <h1 className="text-center text-lg font-semibold mb-4">
            Product Filter
          </h1>

          {/* Price Inputs */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="minPrice" className="block text-sm font-medium">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                onChange={(e) =>
                  setValue([Number(e.target.value), value[1]])
                }
                value={value[0]}
                min={0}
                max={50000}
                placeholder="0"
                className="border w-full px-2 py-2 rounded-lg text-gray-800 dark:text-gray-300"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="maxPrice" className="block text-sm font-medium">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                onChange={(e) =>
                  setValue([value[0], Number(e.target.value)])
                }
                value={value[1]}
                min={0}
                max={50000}
                placeholder="50000"
                className="border w-full px-2 py-2 rounded-lg text-gray-800 dark:text-gray-300"
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

            <div className="flex justify-between items-center mt-2 text-sm">
              <span>Price: ${value[0]} - ${value[1]}</span>
              <button
                type="button"
                className="border px-4 py-1 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
      <h1 className='pl-8 py-2 font-bold text-xl'>{formatCategoryName(categoryName)}</h1>
        <GridProducts items={products} />
      </div>
    </div>
    </div>
  )
}

export default Categories