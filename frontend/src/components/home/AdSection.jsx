import { useEffect, useState } from "react";

const ProductAd = ({ product, ctaText = "Buy Now!", ctaLink = "#" }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate discounted price
  const formatPrice = (price, discount) => {
    const discounted = price - (price * discount) / 100;
    return discounted.toFixed(2);
  };

  // Daily countdown logic (resets at midnight)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="my-10 mx-2 bg-gradient-to-r from-black via-gray-900 to-black text-white py-4 px-4 rounded-lg overflow-hidden">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {product?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-full gap-6 overflow-hidden"
          >
            {/* Left Content */}
            <div className="flex-1 min-w-[200px]">
              <p className="text-green-500 font-medium text-xs sm:text-sm capitalize">
                {item.category.replace("-", " ")}
              </p>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mt-1 leading-snug">
                {item.title}
              </h2>

              {/* Hide description on small screens */}
              <p className="hidden md:block max-w-2/3 text-gray-300 mt-2 text-sm line-clamp-2">
                {item.description}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-500">
                  ${formatPrice(item.price, item.discountPercentage)}
                </span>
                <span className="text-xs sm:text-sm md:text-base text-gray-400 line-through">
                  ${item.price}
                </span>
              </div>

              {/* Countdown */}
              <div className="flex gap-2 mt-4">
                {Object.entries(time).map(([label, value], i) => (
                  <div
                    key={i}
                    className="bg-white text-black rounded-md p-2 w-12 h-12 sm:w-14 sm:h-14 flex flex-col justify-center items-center shadow-md"
                  >
                    <span className="text-sm font-bold">
                      {value.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={ctaLink}
                className="inline-block mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-black text-sm font-semibold rounded-lg shadow-md transition"
              >
                {ctaText}
              </a>
            </div>

            {/* Right Image */}
            <div className="flex-shrink-0">
              <img
                src={item.thumbnail || item.images[0]}
                alt={item.title}
                className="max-h-32 sm:max-h-40 md:max-h-48  object-contain drop-shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductAd;
