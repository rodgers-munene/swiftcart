
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function TopDiscountSlider({ products }) {
  return (
    <div className="w-full md:w-1/2 px-4 py-4 md:px-6 lg:px-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        Top Offers
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        className="w-full custom-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="relative bg-white flex flex-col justify-around dark:bg-gray-950 shadow-2xl h-96 rounded-xl overflow-hidden transition duration-300 text-sm">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-[60%]  object-contain"
              />
              <div className="p-3">
                <h3 className="font-semibold truncate">{product.title}</h3>
                <p className="text-gray-500 text-xs truncate mb-1">{product.category}</p>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-green-600 font-medium">${product.price.toFixed(2)}</span>
                  <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                    -{product.discountPercentage.toFixed(0)}%
                  </span>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
