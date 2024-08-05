"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface OneProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductResponse {
  data: OneProduct[];
  currentPage: number;
  numberOfPages: number;
}

const Home = () => {
  const [products, setProducts] = useState<OneProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/products?page=${currentPage}&search=${query}`)
      .then(response => {
        const { data, currentPage, numberOfPages } = response.data as ProductResponse;
        setProducts(data);
        setCurrentPage(currentPage);
        setNumberOfPages(numberOfPages);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [currentPage, query]);

  const handleSearch = () => {
    setCurrentPage(1);
    setQuery(search);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Product List</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="px-4 py-2 border text-black border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <span className="text-xl">Loading...</span>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center min-h-screen">
          <span className="text-xl text-red-500">Error: {error}</span>
        </div>
      )}

      {!loading && !error && (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <li key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <Link href={`/${product.id}`}>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                  <div className="w-[90%] mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    <p className="text-gray-500 mt-2">{product.description.substring(0, 60)}...</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-lg text-gray-700">Page {currentPage} of {numberOfPages}</span>
            <button
              onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, numberOfPages))}
              disabled={currentPage === numberOfPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
