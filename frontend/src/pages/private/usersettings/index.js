import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from '../../../components/user/UserProfile';
import ProductEditList from '../../../components/common/private/ProductEditList';
import ProductAdd from '../../../components/common/private/ProductAdd';
import AddProductButton from '../../../components/common/private/AddProductButton';
import SearchBar from '../../../components/common/SearchBar';

const UserSettings = () => {
  // State Management
  const [isAdding, setIsAdding] = useState(false); // Product Add Form Displayed
  const [products, setProducts] = useState([]); // Store List of Products
  const [loading, setLoading] = useState(true); // Products are being loaded
  const [error, setError] = useState(null); // Error state
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered List of Products
  const [searchQuery, setSearchQuery] = useState(''); // Search query


  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products data');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

    
  // Adds New Product to Product State and hide Product Add Form.
  const handleAddProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setIsAdding(false);
  };

    // Deletes a product from the product state
  const handleDeleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
  };

  useEffect(() => {
    // Filter the products
    setFilteredProducts(
      products.filter(product => 
        product.name && product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    );
  }, [products, searchQuery]);

  // Toggles the display of the Product Add Form
  const handleAddClick = () => {
    setIsAdding(!isAdding);
  };

  // Handle search query change
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Settings Page</h1>
      <UserProfile />
      <SearchBar searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} />
      <div className="flex justify-center mb-4">
        <AddProductButton onAddClick={handleAddClick} />
      </div>
      {isAdding && <ProductAdd onAdd={handleAddProduct} setLoading={setLoading} />}
      <ProductEditList
        products={filteredProducts}
        loading={loading}
        error={error}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default UserSettings;


// Functions are passed down to components so that the component can also execute the function in the Main Component.
// Ex. handleAddClick is passed down to AddProductButton. 

// States are created in the main component, and then functions are passed down to components to update these states. 
