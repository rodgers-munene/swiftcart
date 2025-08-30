import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Bed from '../../assets/bed.webp'
import Wardrobe from '../../assets/wardrobe.webp'
import Chair from '../../assets/chair.webp'
import Iphone from '../../assets/iphone.webp'
import Macbook from '../../assets/macbook.webp'
import Airpods from '../../assets/airpods.webp'


const slides = [
  {
    id: "tech",
    title: "Explore the Latest Tech",
    subtitle: "Laptops, Smartphones, Headphones",
    images: [
      Macbook,
      Iphone,
      Airpods,
    ],
  },
  {
    id: "furniture",
    title: "Stylish Modern Furniture",
    subtitle: "Beds, Chairs, Tables & More",
    images: [
      Bed,
      Wardrobe,
      Chair,
    ],
  },
];

const HomeSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative bg-gray-950 w-full xl:w-[85%] mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
      {/* Text Content */}
      <div className="flex-1 space-y-4 text-center md:text-left order-2 md:order-1">
        <h3 className="text-sm md:text-base text-gray-200">
          {slides[current].subtitle}
        </h3>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          {slides[current].title}
        </h1>
        <button
          onClick={() => navigate("/categories")}
          className="inline-flex items-center mt-4 px-1 border-b border-white py-1 text-white hover:scale-105 transition-transform duration-200"
        >
          Shop Now <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      {/* Images */}
     <div
  className="flex-1 relative flex justify-center items-center order-1 md:order-2 
             "
>
  {slides[current].images.map((img, i) => (
    <img
      key={i}
      src={img}
      alt={`Slide ${slides[current].id} image ${i + 1}`}
      className={`
        object-contain md:object-cover rounded-xl transition-all duration-500
        w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64
        ${i === 0 ? "md:absolute md:-left-10 md:top-1/2 md:-translate-y-1/2 z-30 md:rotate-[-6deg]" : ""}
        ${i === 1 ? "md:absolute md:top-1/2 md:-translate-y-1/2 z-20" : ""}
        ${i === 2 ? "md:absolute md:-right-10 md:top-1/2 md:-translate-y-1/2 z-10 md:rotate-[6deg]" : ""}
      `}
    />
  ))}
</div>





      {/* Pagination Dots */}
      <div className="absolute flex justify-center space-x-2 left-1/2 transform -translate-x-1/2 bottom-3 z-50 order-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i ? "bg-gray-600 w-5" : "bg-white w-2"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomeSlideshow;
