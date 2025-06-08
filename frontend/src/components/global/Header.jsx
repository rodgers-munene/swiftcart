import React, { useEffect, useState, useRef } from 'react'
import logo from '../../assets/logo.svg'
import Searchbar from './Searchbar'
import Navbar from './Navbar'
import { ShoppingCart, User, Heart, MenuIcon, XIcon } from 'lucide-react'
import Hamburger from './Hamburger'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const Header = () => {
  const { totalInCart } = useCart()
  const[openProfile, setOpenProfile] = useState(false)
  const[isOpen, setIsOpen] = useState(false)
  const navbarRef = useRef(null)
  const profileRef = useRef(null)
  const toggleButtonRef = useRef(null);
  const { user, token } = useAuth()
  const navigate = useNavigate();


  const toggleProfile = () => {
    setOpenProfile((prev) => !prev)
  }



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

  useEffect(() => {
     const handleProfileClick = (event) => {
      if(profileRef.current && !profileRef.current.contains(event.target)){
        setTimeout(() => setOpenProfile(false), 0);
        }
      }

      if(openProfile){
        document.addEventListener('mousedown', handleProfileClick)
      }

      return () => {
         document.removeEventListener('mousedown', handleProfileClick)
      }
  }, [openProfile, setOpenProfile])

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
        <div className='relative'>
           <button 
           onClick={toggleProfile}
           className='hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-full'>
              <User />
          </button>
        </div>
        <button onClick={toggleNavbar}>
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>
      
      

      <div className='hidden md:block md:w-1/3 lg:w-1/6'>
        <div className='w-full flex items-center justify-around'>
            <Searchbar />


            <button className='hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-full'>
              <Heart />
            </button>
            <button 
            onClick={() => {
              navigate('/cart')
            }}
            className='relative hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-full'>
              <ShoppingCart />
              <p className='absolute right-1 -top-2 '>{totalInCart}</p> 
            </button>
            <button onClick={toggleNavbar} className='lg:hidden'>
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

            {/* user management */}
            <div className=''>
                <button 
                onClick={toggleProfile}
                className='hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-full'>
                <User />
                </button>
            </div>

            
        </div>      
      </div>

      {/* profile component */}
      {openProfile && (
        <div 
          ref={profileRef}
          className={`absolute w-36 h-auto bg-gray-400 right-2 sm:right-3 top-10 md:top-14 z-50 rounded-lg dark:bg-gray-800`}>
            {token === null? 
            <div className='flex flex-col items-start'>
              <a
              href='/login'
              className=' flex items-center h-10 border w-full rounded-t-lg
                hover:bg-gray-300 dark:hover:bg-gray-700 pl-4 
                hover:text-white '>Login</a>
              <a
                href='/signup'
              className='flex items-center h-10 border w-full rounded-b-lg hover:bg-gray-300 dark:hover:bg-gray-700 pl-4'>Signup</a> 
            </div>:
            <div>
              <button 
              onClick={()=> {
                navigate('/profile')
              }}
              className='h-10 w-full rounded-lg'>View Profile</button>
            </div>
            }
          </div>
      )}
      

      <div 
      ref={navbarRef}
      className={`absolute z-50 right-0 transition-all duration-500 ease-in-out lg:hidden ${isOpen? "top-10 md:top-14": "-top-[30rem]"}`}>
        <Hamburger />
           
      </div>
    </div>
  )
}

export default Header