import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/backendApi';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const productData = await getProductById(id);
      setProduct(productData);
    };

    if (id) getData();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image Placeholder */}
        <div className="flex-1 bg-gray-200 h-64 md:h-96 rounded-lg" />

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{product.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Brand: {product.brand}</p>
          <p className="text-gray-800 dark:text-gray-200">{product.description}</p>

          <div className="text-xl font-semibold text-green-600 dark:text-green-400">
            ${product.price.toFixed(2)}
            <span className="text-sm line-through text-gray-400 ml-2">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          </div>

          <p className="text-yellow-500">Rating: {product.rating} / 5</p>
          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
          <p className="text-sm text-gray-600">Weight: {product.weight}g</p>

          <div className="text-sm text-gray-700">
            Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
          </div>

          <div className="text-sm text-gray-700">Warranty: {product.warrantyInformation}</div>
          <div className="text-sm text-gray-700">Shipping: {product.shippingInformation}</div>
          <div className="text-sm font-medium text-green-600">{product.availabilityStatus}</div>

          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded-lg bg-white dark:bg-gray-800">
              <p className="font-semibold">{review.reviewerName}</p>
              <p className="text-yellow-500">Rating: {review.rating} / 5</p>
              <p className="text-sm text-gray-600 italic">
                {new Date(review.date).toLocaleDateString()}
              </p>
              <p className="mt-1 text-gray-800 dark:text-gray-200">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
