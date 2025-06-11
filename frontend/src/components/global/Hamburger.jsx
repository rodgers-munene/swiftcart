import { ShoppingCart, User, Heart} from 'lucide-react'
import { useLocation, Link, useNavigate } from 'react-router-dom'


const Hamburger = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    {name: 'Home', path: '/'},
    {name: 'Categories', path: '/categories'},
    {name: 'Groceries', path: '/categories/groceries'},
    {name: 'Beauty', path: '/categories/beauty'},
    {name: 'Furniture', path: '/categories/furniture'},
    {name: 'Contact Us', path: '/contact-us'}
  ]

  return (
    <div className='w-[250px] h-auto bg-gray-200 dark:bg-gray-700 rounded-lg'>
        <div className='flex flex-col h-full'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path

            return (
                <Link
                key={item.path}
                to={item.path}
                className={`pl-4 py-2 text-black  ${isActive? "bg-gray-700 text-white dark:bg-gray-300 dark:text-black": "dark:text-white"}`}
                >
                  {item.name}
                </Link>
            )
          })}
            
            
            <button className='flex items-center py-2 pl-4 text-black dark:text-white md:hidden'>
              <p>Wishlist</p> <Heart className='ml-1'/>
            </button>
            <button 
            onClick={() => {
              navigate('/cart')
            }}
            className='flex items-center py-2 pl-4 text-black dark:text-white md:hidden'>
              <p>Cart</p> <ShoppingCart className='ml-1' /> 
            </button>
        </div>

        
    </div>
  )
}

export default Hamburger


