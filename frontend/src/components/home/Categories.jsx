import React, { useEffect, useState } from 'react'
import { getCategories } from '../../services/backendApi'
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories)
        }

        fetchCategories();

    }, [getCategories])

    // format the category names using regex
    const formatCategoryName = (name) => {
        return name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

  return (
    <div>
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white text-center">Shop by Category</h2>
        </div>
        
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow pl-4 pt-1 pb-1 h-full overflow-y-auto md:overflow-y-hidden max-h-[400px]">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
  )
}

export default Categories
