import React, { useState } from 'react'
import { ShoppingCart, User, Heart} from 'lucide-react'


const Hamburger = () => {

  return (
    <div className='w-[250px] h-auto bg-gray-200 dark:bg-gray-700 rounded-lg'>
        <div className='flex flex-col h-full'>
            <a href="/" className='pl-4 py-2 text-black dark:text-white'>Home</a>
            <a href="" className='pl-4 py-2 text-black dark:text-white'>Categories</a>
            <a href="/beauty" className='pl-4 py-2 text-black dark:text-white'>Beauty</a>
            <a href="/clothing" className='pl-4 py-2 text-black dark:text-white'>Clothing</a>
            <a href="/blog" className='pl-4 py-2 text-black dark:text-white'>Blog</a>
            <a href="/contact-us" className='pl-4 py-2 text-black dark:text-white'>Contact</a>
            <button className='text-black dark:text-white pt-2 pl-4 flex items-center md:hidden'>
              <p>Profile</p> <User className='ml-1' />
            </button>
            <button className='text-black dark:text-white py-2 pl-4 flex items-center md:hidden'>
              <p>Wishlist</p> <Heart className='ml-1'/>
            </button>
            <button className='text-black dark:text-white py-2 pl-4 flex items-center md:hidden'>
              <p>Cart</p> <ShoppingCart className='ml-1' /> 
            </button>
        </div>

        
    </div>
  )
}

export default Hamburger