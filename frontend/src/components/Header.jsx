import React, { useEffect, useState, useRef } from 'react'
import logo from '../assets/logo.svg'
import Searchbar from './Searchbar'
import Navbar from './Navbar'
import { ShoppingCart, User, Heart, MenuIcon, XIcon } from 'lucide-react'
import Hamburger from './Hamburger'

const Header = () => {
  const[isOpen, setIsOpen] = useState(false)
  const navbarRef = useRef(null)

  useEffect(() => {
    const handleOutsideCLick = (event) => {
        if(navbarRef.current && !navbarRef.current.contains(event.target)){
          setIsOpen(false)
        }
    }

    if(isOpen){
      document.addEventListener('mousedown', handleOutsideCLick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideCLick)
    }
  }, [isOpen, setIsOpen])

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className='w-screen relative border-b flex items-center justify-between lg:justify-around '>
      <div className='flex items-center md:w-1/3 lg:w-1/6'>
        <img src={logo} alt="Logo svg file" className='w-8 h-8 md:w-14 md:h-14'/>
        <h1 className='text-xl md:text-3xl '>SwiftCart</h1>
      </div>

      <div className='w-1/2 hidden lg:block'>
        <Navbar />
      </div>

      <div className='md:hidden flex items-center mr-2'>
        <Searchbar />
        <button onClick={toggleNavbar}>
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>
      
      

      <div className='hidden md:block md:w-1/3 lg:w-1/6'>
        <div className='w-full flex items-center justify-around'>
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
            <button onClick={toggleNavbar} className='lg:hidden'>
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
        </div>      
      </div>

      

      <div 
      ref={navbarRef}
      className={`absolute right-0 transition-all duration-500 ease-in-out lg:hidden ${isOpen? "top-10 md:top-14": "-top-[30rem]"}`}>
        <Hamburger />
           
      </div>
    </div>
  )
}

export default Header