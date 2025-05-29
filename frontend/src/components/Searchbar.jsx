import React, { useEffect, useRef, useState } from 'react'
import { SearchIcon, XIcon } from 'lucide-react'


const Searchbar = () => {
  const [isSearchBar, setIsSearchBar] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClick = (event) => {
      // check if click occurs outside of the search component
      if(searchRef.current && !searchRef.current.contains(event.target)){
        setIsSearchBar(false) //hide the search bar

      }
    }

     if(isSearchBar){
        document.addEventListener('mousedown', handleClick)
      }

      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
  }, [isSearchBar, setIsSearchBar])
  
  const toggleSearch = () => {
    setIsSearchBar((prev) => !prev)

  }


  return (
    <div className='flex'>
        <div 
        ref={searchRef}
        className={`fixed top-1.5 left-0 md:left-1/4 lg:left-1/3 w-screen md:w-1/2 lg:w-1/3 border 
        bg-white rounded-lg h-28 min-h-28 transition-all duration-300 shadow-2xl ${!isSearchBar? "hidden": ""}
        text-sm md:text-base`}
        >
          <div className=' relative w-full h-full flex items-start'>
            <input type="" className='bg-gray-200 h-8 w-full pl-3 outline-0 rounded-tl-lg text-gray-800' placeholder='Search for Products, Categories or Brands'/>
            <button 
              className='bg-gray-300 dark:bg-gray-700 p-1 rounded-tr-lg'
            > <SearchIcon className=''/> </button>
            <button 
              className='absolute right-0 bottom-0 px-3 py-2 bg-blue-400 rounded-br-lg rounded-tl-lg flex font-bold '
              onClick={toggleSearch}
              > Close <XIcon /> </button> 
          </div>
          
        </div>
        <button 
          className='hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-full'
          onClick={toggleSearch}
          > <SearchIcon className=''/> </button>
    </div>
  )
}

export default Searchbar