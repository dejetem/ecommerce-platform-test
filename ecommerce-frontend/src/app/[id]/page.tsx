"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const ProductDetail = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      axios.get(`http://localhost:5000/api/products/${params.id}`)
        .then(response => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [params.id]);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-xl text-red-500">Error: {error}</span>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover"/>
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-gray-800 mr-2">Price:</span>
            <span className="text-2xl text-gray-600">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold text-gray-800 mr-2">Stock:</span>
            <span className="text-xl text-gray-600">{product.stock}</span>
          </div>
          <button className="mt-6 w-full py-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition duration-300">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
