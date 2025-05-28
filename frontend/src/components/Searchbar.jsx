import React from 'react'
import { SearchIcon } from 'lucide-react'

const Searchbar = () => {
  return (
    <div className='flex'>
        {/* <input type="" className='bg-gray-200 h-8'/> */}
        <button className='hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-full'> <SearchIcon className=''/> </button>
    </div>
  )
}

export default Searchbar