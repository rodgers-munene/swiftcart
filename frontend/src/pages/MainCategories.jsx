import React, { useEffect, useState } from 'react'
import { getCategories, getProductsInCategory } from '../services/backendApi'
import { Link } from 'react-router-dom';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { ArrowRight } from 'lucide-react'
import GridProducts from '../components/products/gridProducts';


const MainCategories = () => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false)
    const [vehicle, setVehicles] = useState([])
    const [fragrances, setFragrances] = useState([])
    const [mobileAccessories, setMobileAccessories] = useState([])
    const [smartPhones, setSmartphones] = useState([])
    const [laptops, setLaptops] = useState([])
    const [Loading, setLoading] = useState(false)
    const topCategories = [
        {name: "Smartphones", slug: "smartphones", src: smartPhones},
        {name: "Mobile Accessories", slug: "mobile-accessories", src: mobileAccessories},
        {name: "Laptops", slug: "laptops", src: laptops},
        {name: "Fragrances", slug: "fragrances", src: fragrances},
        {name: "Vehicles", slug: "vehicle", src: vehicle}
    ]

    
    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories)
        }

        fetchCategories();

    }, [getCategories])

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            const vehicleData = await getProductsInCategory('vehicle', 4);
            const fragranceData = await getProductsInCategory('fragrances', 4);
            const mobileAccessoriesData = await getProductsInCategory('mobile-accessories', 4);
            const laptopData = await getProductsInCategory('laptops', 4);
            const smartPhoneData = await getProductsInCategory('smartphones', 4);
            setVehicles(vehicleData);
            setFragrances(fragranceData);
            setMobileAccessories(mobileAccessoriesData);
            setLaptops(laptopData)
            setSmartphones(smartPhoneData)
        }
        
        getData()
        setLoading(false)


    }, [getProductsInCategory])

    const handleCategories = () => {
        setShowCategories((prev) => !prev)
    }

    // format the category names using regex
    const formatCategoryName = (name) => {
        return name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };
  return (
    <div className='w-screen'>

        <div className='w-full flex flex-col items-center h-auto'>
            <div className='flex justify-end w-full md:w-[95%]'>
                <button 
                onClick={handleCategories}
                className="cursor-pointer flex items-center text-xl font-semibold mt-3 mb-1 text-gray-800 dark:text-white text-center mr-6">
                {showCategories ? (<span className="flex items-center gap-1">
                            Hide Categories <IoIosArrowUp />
                            </span>)  : 
                            (
                        <span className="flex items-center gap-1">
                            Show All Categories <IoIosArrowDown />
                        </span>
                        )}
                </button>

                </div>
            
            <div className={`bg-white border dark:bg-gray-950 rounded-xl shadow pl-4 pt-1 pb-1 h-52 overflow-y-auto md:overflow-y-hidden w-full md:w-[95%] ${showCategories? "block": "hidden"}`}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => (
                    <li
                        key={category}
                        className="text-sm text-gray-700 dark:text-gray-100 hover:text-blue-600 cursor-pointer transition"
                    >
                        <Link to={`/categories/${category}`}>{formatCategoryName(category)}</Link>
                    </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* example of categories */}
        <div className='mt-5'>

            {topCategories.map((item, index) => (
                <div
                key={index}
                className='flex items-center flex-col mt-3 mb-5'>
                    <div className=' w-[90vw] flex justify-between mb-5 items-center'>
                        <p className='text-sm sm:text-base lg:text-xl font-bold'>{item.name}</p>
                        <button className='flex rounded-md text-sm px-2 py-1 text-black bg-white items-center'>View all <ArrowRight className='w-4 h-4'/></button>
                    </div>
                    <GridProducts items={item.src}/>
                </div>
            ))}
            {/* mobile accessories */}
            
        </div>
    </div>
  )
}

export default MainCategories