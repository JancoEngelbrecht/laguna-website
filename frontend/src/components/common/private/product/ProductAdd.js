import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const ProductAdd = ({ onAdd, setLoading }) => {
  // Initialize Form Input State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '', 
    descript: '',
  });
  const [error, setError] = useState(null);

  // Manage Change to Form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Adding of Images
  const handleImageDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setNewProduct(prevState => ({
        ...prevState,
        image: base64Image
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageDrop,
    accept: 'image/jpeg, image/png, image/gif, image/bmp, image/webp',
    multiple: false
  });

  // Submit the new product to the DB and to the Main Component
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/products', newProduct);
      const addedProduct = response.data; // Get the newly created product from the response
      setError(null);
      onAdd(addedProduct); 
      setLoading(false);
      console.log(addedProduct)
    } catch (error) {
      console.error(error);
      setError('Failed to add product data');
      setLoading(false);
    }
  };

  return (
    <div className="w-full mb-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            name="descript"
            value={newProduct.descript}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <div {...getRootProps()} className="dropzone shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer">
            <input {...getInputProps()} />
            <p className="text-center">Add Image</p>
          </div>
        </div>
        {newProduct.image && (
          <div className="mb-4">
            <img src={newProduct.image} alt={newProduct.name} className="w-full h-64 object-cover rounded" />
          </div>
        )}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;