import { useEffect, useState } from 'react'
import GridProducts from '../components/gridProducts'
import { topCategories, getProductsInCategory } from '../services/backendApi'
import { ArrowRight } from 'lucide-react'
import FlexProducts from '../components/flexProducts'
import NewsHome from '../components/newsHome'

const Home = () => {
  const [beautyProducts, setBeautyProducts] = useState([]);
  const [fashionProducts, setFashionProducts] = useState([])
  const [homeProducts, setHomeProducts] = useState([])


  useEffect(() => {
    const getData = async () => {
      const beautyData = await getProductsInCategory(['beauty', 'skin-care'], 8)
      const fashionData = await getProductsInCategory(['mens-shirts', 'womens-dresses'], 8)
      const homeProducts = await getProductsInCategory(['home-decoration', 'furniture'], 8)
      setBeautyProducts(beautyData)
      setFashionProducts(fashionData)
      setHomeProducts(homeProducts)
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

          <div className=' w-[90vw] flex justify-between mb-5 items-center'>
            <p className='text-sm sm:text-base lg:text-xl font-bold'>Beauty & Skincare</p>
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
          <div className=' w-[90vw] flex justify-between mb-5 items-center'>
            <p className='text-sm sm:text-base lg:text-xl font-bold'>Fashion & Accessories</p>
            <button className='flex rounded-md text-sm px-2 py-1 text-black bg-white items-center'>View all <ArrowRight className='w-4 h-4'/></button>
          </div>
          <GridProducts items={fashionProducts} />
        </div>

        {/* advert section */}
        <div className='w-full flex justify-center mt-5 mb-5 '>
            <div className='w-[95vw] sm:w-[90vw] h-24 bg-gradient-to-r from-amber-800 to-amber-400 rounded-2xl pl-3 pt-2'>
              <h1 className='text-sm sm:text-base lg:text-2xl font-bold text-green-900'>In store or online, your health & safety is our top priority</h1>
              <p className='text-white text-xs md:text-base pt-3'>The only store that makes your life easier, makes you enjoy life and makes it better.</p>
            </div>
        </div>

        {/* furniture section */}
        <div className='flex items-center flex-col mt-5 w-full mb-5'>
          <div className=' w-[90vw] flex justify-between mb-5 items-center'>
            <p className='text-sm sm:text-base lg:text-xl font-bold'>Furniture & Home Accessories</p>
            <button className='flex rounded-md text-sm px-2 py-1 text-black bg-white items-center'>View all <ArrowRight className='w-4 h-4'/></button>
          </div>
          <GridProducts items={homeProducts} />
        </div>

        {/* news section */}
        <div className='flex items-center flex-col mt-5 w-full mb-5'>
          <div className=' w-[90vw] flex justify-between mb-5 items-center'>
            <p className='text-sm sm:text-base lg:text-xl font-bold'>News Articles</p>
            <button className='flex rounded-md text-sm px-2 py-1 text-black bg-white items-center'>View More <ArrowRight className='w-4 h-4'/></button>
          </div>
          <NewsHome />
        </div>
      </div>

    </div>
  )
}

export default Home