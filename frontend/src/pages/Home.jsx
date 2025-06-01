import { useEffect, useState } from 'react'
import GridProducts from '../components/gridProducts'
import { topCategories, getProductsInCategory } from '../services/backendApi'
import { ArrowRight } from 'lucide-react'
import FlexProducts from '../components/flexProducts'

const Home = () => {
  const [beautyProducts, setBeautyProducts] = useState([]);
  const [fashionProducts, setFashionProducts] = useState([])


  useEffect(() => {
    const getData = async () => {
      const beautyData = await getProductsInCategory(['beauty', 'skin-care'], 8)
      const fashionData = await getProductsInCategory(['mens-shirts', 'womens-dresses'], 4)
      setBeautyProducts(beautyData)
      setFashionProducts(fashionData)
    }

    getData()
  }, [getProductsInCategory])

  return (
    <div className='w-screen min-h-screen'>
      {/* categories section */}
      <div className=' w-full flex flex-col items-center h-24 justify-around'>
          <h1 className='text-xl font-bold'>Top Categories</h1>
          {/* <div className='w-[98vw] sm:w-[85vw] flex overflow-x-auto sm:justify-around py-2'>
            
          {topCategories? topCategories.map((item, index) => (
            <div className='min-w-36'> 
              <a href='' key={index} className='mx-1'>{item}</a>
            </div>
          )): "Loading"}


          </div> */}
      </div>

      <div className='w-full min-h-screen bg-gray-300 dark:bg-gray-700 flex items-center flex-col'>
        {/* beauty section */}
        <div className='flex items-center flex-col mt-5'>

          <div className=' w-[95vw] flex justify-between mb-5 items-center'>
            <p className='text-sm sm:text-base lg:text-xl font-bold'>Beauty and Skincare</p>
            <button className='flex rounded-md text-sm px-2 py-1 text-black bg-white items-center'>View all <ArrowRight className='w-4 h-4'/></button>
          </div>
          <GridProducts items={beautyProducts}/>
        </div>
        {/* only this week section */}
        <div className='my-5'>
          <FlexProducts />
        </div>

        {/* fashion section */}
        <div className='flex items-center flex-col mt-5 w-full mb-5'>
          <div className=' w-[95vw] flex justify-between mb-5 items-center'>
            <p className='text-sm sm:text-base lg:text-xl font-bold'>Fashion and Accessories</p>
            <button className='flex rounded-md text-sm px-2 py-1 text-black bg-white items-center'>View all <ArrowRight className='w-4 h-4'/></button>
          </div>
          <GridProducts items={fashionProducts} />
        </div>
      </div>

    </div>
  )
}

export default Home