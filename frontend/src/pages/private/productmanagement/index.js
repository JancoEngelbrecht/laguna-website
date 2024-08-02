import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import UserProfile from '../../../components/common/private/user/UserProfile';
import ProductEditList from '../../../components/common/private/product/ProductEditList';
import ProductAdd from '../../../components/common/private/product/ProductAdd';
import AddProductButton from '../../../components/common/private/product/AddProductButton';
import SearchBar from '../../../components/common/private/product/SearchBar';
import Spinner from "../../../components/common/global/Spinner";

const ProductManagement = () => {
  // State variables for managing product data and UI state
  const [isAdding, setIsAdding] = useState(false); // Toggle to show/hide Product Add Form
  const [products, setProducts] = useState([]); // List of products fetched from API
  const [loading, setLoading] = useState(true); // Indicates whether products are being fetched
  const [error, setError] = useState(null); // Stores any error encountered during data fetching
  const [filteredProducts, setFilteredProducts] = useState([]); // List of products filtered by search query
  const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering products

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make an API call to get the list of products
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProducts(response.data); // Update state with fetched products
      } catch (error) {
        // Handle errors by logging and setting an error message
        console.error('Error fetching products:', error);
        setError('Failed to fetch products data');
      } finally {
        // Ensure loading state is set to false once data is fetched or if an error occurs
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on component mount

  // Add a new product to the list and hide the add form
  const handleAddProduct = useCallback((newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]); // Add new product to the list
    setIsAdding(false); // Hide the add form
  }, []);

  // Delete a product by its ID
  const handleDeleteProduct = useCallback((productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product._id !== productId)); // Remove product from the list
  }, []);

  // Update filteredProducts whenever products or searchQuery change
  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name && product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    );
  }, [products, searchQuery]); // Dependency array includes products and searchQuery

  // Toggle the display of the Product Add Form
  const handleAddClick = useCallback(() => {
    setIsAdding(prev => !prev); // Toggle isAdding state
  }, []);

  // Update the search query used for filtering products
  const handleSearchQueryChange = useCallback((query) => {
    setSearchQuery(query); // Set the new search query
  }, []);

  // Render a spinner while data is loading
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Product Management Page</h1>
      <UserProfile /> {/* Display user profile */}
      <SearchBar searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} /> {/* Search bar for filtering products */}
      <div className="flex justify-center mb-4">
        <AddProductButton onAddClick={handleAddClick} /> {/* Button to toggle the add product form */}
      </div>
      {isAdding && <ProductAdd onAdd={handleAddProduct} setLoading={setLoading} />} {/* Conditionally render the add product form */}
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if there's an error */}
      <ProductEditList
        products={filteredProducts} // Pass the filtered list of products
        loading={loading}
        error={error}
        onDelete={handleDeleteProduct} // Pass delete handler
      />
    </div>
  );
};

export default ProductManagement;