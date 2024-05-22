import React, { useState } from 'react';
import UserProfile from '../../../components/user/UserProfile';
import ProductEditList from '../../../components/common/private/ProductEditList';
import ProductAdd from '../../../components/common/private/ProductAdd';
import AddProductButton from '../../../components/common/private/AddProductButton';
import SearchBar from '../../../components/common/SearchBar';

const UserSettings = () => {
  // State Management
  const [isAdding, setIsAdding] = useState(false); // Product Add Form Displayed
  const [products, setProducts] = useState([]); // Store List of Products
  const [loading, setLoading] = useState(null); // Products are being loaded
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [filteredProducts, setFilteredProducts] = useState([])

  // Adds New Product to Product State and hide Product Add Form.
  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts); 
    setFilteredProducts(updatedProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    setIsAdding(false);
  };

  // Toggles the display of the Product Add Form
  const handleAddClick = () => {
    setIsAdding(!isAdding);
  };

  // Text Displays for loading
  if (loading) return <div className="text-center py-10">Loading...</div>;

  // Filter products based on search query
   const handleSearch = () => {
    setFilteredProducts(products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Settings Page</h1>
      <UserProfile />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
      <div className="flex justify-center mb-4">
        <AddProductButton onAddClick={handleAddClick} />
      </div>
      {isAdding && <ProductAdd onAdd={handleAddProduct} setLoading={setLoading} />}
      <ProductEditList products={products} onAdd={handleAddProduct} />
    </div>
  );
};

export default UserSettings;


// Functions are passed down to components so that the component can also execute the function in the Main Component.
// Ex. handleAddClick is passed down to AddProductButton. 

// States are created in the main component, and then functions are passed down to components to update these states. 
