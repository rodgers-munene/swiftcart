import GridProducts from '../components/gridProducts'
import { topCategories } from '../services/backendApi'

const Home = () => {
  

  return (
    <div className='w-screen min-h-screen'>
      {/* categories section */}
      <div className=' w-full flex flex-col items-center h-24 justify-around'>
          <h1 className='text-xl font-bold'>Top Categories</h1>
          <div className='w-[98vw] sm:w-[85vw] flex overflow-x-auto sm:justify-around py-2'>
            
          {topCategories? topCategories.map((item, index) => (
            <div className='min-w-36'> 
              <a href='' key={index} className='mx-1'>{item}</a>
            </div>
          )): "Loading"}


          </div>
      </div>

      <div className='w-full flex justify-center'>
          <GridProducts />
      </div>

    </div>
  )
}

export default Home