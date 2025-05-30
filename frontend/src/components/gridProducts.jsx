import React from 'react'

const GridProducts = ( { items } ) => {
  return (
    <div className='grid grid-cols-6 grid-rows-2 w-[90vw] h-[400px] bg-gray-500'>
        {items? items.map((item, index) => {
          const spanClass = index === 0 || index === 2?'row-span-2 flex-col items-center': 'col-span-2 flex-row';

          return(
            <div key={index}
            className={`flex bg-gray-300 ${spanClass} border`}
            >
                <img src={item.thumbnail} alt={item.title} className={`${index === 0 || index ===2? " h-36 w-36": "w-32 h-32"}`}/>
            </div>
          )
        }): "Loading..."}
    </div>
  )
}

export default GridProducts