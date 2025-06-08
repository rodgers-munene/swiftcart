import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 'tech',
    title: 'Explore the Latest Tech',
    subtitle: 'Laptops, Smartphones, Headphones',
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp'
    ]
  },
  {
    id: 'furniture',
    title: 'Stylish Modern Furniture',
    subtitle: 'Beds, Chairs, Tables & More',
    images: [
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp',
      'https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp',
      'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp'
    ]
  }
];

const HomeSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <div className="w-full bg-gray-300 dark:bg-gray-700 py-10">
      <div className="bg-gray-200 dark:bg-gray-900 max-w-6xl min-h-full mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h3 className="text-sm text-gray-500">{slide.subtitle}</h3>
          <h1 className="text-3xl md:text-4xl font-bold">{slide.title}</h1>
          <button
            onClick={() => {
              navigate('/categories')
            }}
           className="mt-4 px-6 py-2 bg-black text-white rounded">Shop Now</button>
        </div>
        <div className="flex-1 flex justify-center items-center gap-4 flex-wrap">
          {slide.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${slide.id} image ${i + 1}`}
              className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded shadow-md"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-6 rounded-full transition-all duration-300 ${
              current === i ? 'bg-black' : 'bg-white'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default HomeSlideshow