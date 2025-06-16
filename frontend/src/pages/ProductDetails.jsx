import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, getProductsInCategory } from "../services/backendApi";
import StarRating from "../components/products/StarRating";
import GridProducts from "../components/products/gridProducts";
import { ArrowRight } from "lucide-react";
import { Heart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Notification from "../components/global/notification";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(0);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { handleAddToCart } = useCart();
  const [message, setMessage] = useState()
  const [show, setShow] = useState()
  const navigate = useNavigate()
  const {token} = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const getData = async () => {
      const productData = await getProductById(id);
      setProduct(productData);
    };

    if (id) getData();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      const categoryData = await getProductsInCategory(product.category, 4);
      setCategoryProducts(categoryData);
    };

    if (product) getData();
  }, [product]);

  const handleClick = (value) => {
    setImage(value);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="w-screen">
      {/* <div className="absolute top-12 md:top-15 left-2 sm:left-6">
        <DynamicBreadcrumb />{" "}
      </div> */}

      <div className="px-4 py-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image Placeholder */}
          <div className="flex-1 flex flex-col items-center justify-center h-64 md:h-96">
            <div className="w-full flex items-center justify-center bg-gray-200 h-full rounded-lg">
              <img
                src={product.images[image]}
                alt="image one"
                className="w-[60%]"
              />
            </div>
            <div className="h-32 w-full flex justify-center items-center">
              {product.images.map((image, index) => (
                <div
                  onClick={() => {
                    handleClick(index);
                  }}
                  key={index}
                  className="mr-2 cursor-pointer"
                >
                  <img
                    src={image}
                    alt="Image nav"
                    className="w-16 h-16 border rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {product.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Brand: {product.brand}
            </p>
            {/* sku + rating */}
            <div className="border-b pb-5 flex items-center">
              <div className="text-yellow-500 mr-3 flex items-center">
                <StarRating rating={product.rating} />
                <span className="border rounded-md px-1 ml-2 text-black dark:text-white border-gray-500 text-xs">
                  {product.rating.toFixed(2)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                SKU: {product.sku}
              </p>
            </div>
            <p className="text-gray-800 dark:text-gray-200">
              {product.description}
            </p>

            <div className="text-xl font-semibold text-green-600 dark:text-green-400">
              ${product.price.toFixed(2)}
              <span className="text-sm line-through text-gray-400 ml-2">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            </div>

            <p className="text-sm text-gray-600">Weight: {product.weight}</p>

            <div className="text-sm text-gray-700">
              Dimensions: {product.dimensions.width} x{" "}
              {product.dimensions.height} x {product.dimensions.depth} cm
            </div>

            <div className="text-sm text-gray-700">
              Warranty: {product.warrantyInformation}
            </div>
            <div className="text-sm text-gray-700">
              Shipping: {product.shippingInformation}
            </div>
            <div className="text-sm font-medium text-green-600">
              {product.availabilityStatus}
            </div>

            <div className="flex items-center justify-between sm:justify-start">
              <button
                onClick={() => {
                   if (token !== null) {
                      handleAddToCart(item._id, 1);
                      setMessage("Product Added to Cart");
                      setShow(true);
                    } else {
                      setMessage("Login to Access cart");
                      setShow(true);
                      setTimeout(() => {
                        navigate("/login");
                      }, 1000);
                    }
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button className="flex items-center border border-blue-700 py-2 rounded-lg px-4 ml-3">
                Add to Wish <Heart className="ml-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Customer Reviews
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="p-5 border rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Review Header */}
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {review.reviewerName}
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-yellow-500 text-sm">
                    <StarRating rating={review.rating} />
                  </div>
                </div>

                {/* Review Comment */}
                <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* related products Section */}
      <div className="w-screen">
        {product && (
          <div className="flex items-center flex-col mt-3 mb-5">
            <div className=" w-[90vw] flex justify-between mb-5 items-center">
              <p className="text-sm sm:text-base lg:text-xl font-bold">
                Related Products
              </p>
              <button 
              onClick={() => {
                navigate(`/categories/${product.category}`)
              }}
              className="flex rounded-md text-sm px-2 py-1 text-black bg-white items-center">
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <GridProducts items={categoryProducts} />
          </div>
        )}
      </div>

    {show && (
        <Notification
          message={message}
          duration={800}
          onClose={() => setShow(false)}
        />
      )}

    </div>
  );
}
