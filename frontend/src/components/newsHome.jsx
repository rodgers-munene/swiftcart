import React, { useEffect, useState } from 'react'
import { fetchNews } from '../services/newsApi';


const NewsHome = () => {
    const [news , setNews] = useState([]);

    useEffect(() => {
        const getNews = async () => {
            const newsData = await fetchNews(3)
            setNews(newsData);
            console.log(newsData);
        }

        getNews();
    }, [fetchNews])

    function formatToYMD(dateString) {
        return new Date(dateString).toISOString().split('T')[0];
    }


  return (
    <div className='flex overflow-x-auto overflow-y-hidden w-screen sm:w-[95vw] p-2 justify-between'>
       {news? news.map((item, index) => (
            <div key={index}
            className='flex flex-col bg-white dark:bg-gray-950 rounded-lg min-w-[20rem] sm:min-w-[26rem] h-72 sm:h-80 relative mr-2'>
                <div className='w-full h-2/3'>
                    <img className='w-full h-full'
                    src={item.urlToImage} alt={item.title} />
                </div>
                <div className='h-full flex flex-col justify-around pl-2'>
                    <h1 className='line-clamp-1 font-bold'>{item.title}</h1>
                    <p className='text-gray-400 line-clamp-2'>{item.description}</p>

                    <div className='flex items-center'>
                        <p className='mr-4 text-sm'>by <span className='font-medium'>{item.author}</span></p>
                        <p className='text-sm'>{formatToYMD(item.publishedAt)}</p>
                    </div>
                </div>

            </div>
       )): "Loading"}
    </div>
  )
}

export default NewsHome