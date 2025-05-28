import React from 'react'
import logo from '../assets/logo.svg'
import Searchbar from './Searchbar'
import Navbar from './Navbar'
import { ShoppingCart, User, Heart } from 'lucide-react'

const Header = () => {
  return (
    <div className='w-screen border-b flex items-center justify-around'>
      <div className='flex items-center w-1/6'>
        <img src={logo} alt="Logo svg file" className='w-14 h-14'/>
        <h1 className='text-3xl'>SwiftCart</h1>
      </div>

      <div className='w-1/3'>
        <Navbar />
      </div>

      <div className='w-1/6 flex items-center justify-around'>
        <Searchbar />
        <button className='hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-full'>
          <User />
        </button>
        <button className='hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-full'>
          <Heart />
        </button>
        <button className='hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-full'>
          <ShoppingCart /> 
        </button>
      </div>
    </div>
  )
}

export default Header