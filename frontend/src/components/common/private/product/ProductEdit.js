import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const ProductEdit = ({ product, onUpdate, onDelete }) => {
  const [localProduct, setLocalProduct] = useState({ ...product });
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(product.image || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setLocalProduct((prevState) => ({
        ...prevState,
        image: base64Image,
      }));
      setImagePreview(base64Image);
    };

    reader.onerror = () => {
      setError('Failed to read image file');
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageDrop,
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Update the product in the products collection
      await axios.put(`http://localhost:4000/products/${localProduct._id}`, localProduct);
  
      // Fetch the basket items if the localProduct._id matches identity
      const response = await axios.get(`http://localhost:4000/basket?identity=${localProduct._id}`);
      const basketItems = response.data;
      console.log(basketItems)

      // Iterate through the basket items array
      for (const basketItem of basketItems) {
        console.log(basketItem.identity, localProduct._id);
      
        if (basketItem && basketItem.identity === localProduct._id) {
          await axios.put(`http://localhost:4000/basket?identity=${basketItem.identity}`, {
            price: localProduct.price,
            image: localProduct.image,
            descript: localProduct.descript,
          });
          console.log(`Basket item with identity ${basketItem.identity} updated successfully`);
        } else {
          console.log(`Basket item with identity ${basketItem.identity} not found`);
        }
      }
  
      alert('Product Updated Successfully');
      setError(null);
      onUpdate(); // Updates the ProductEditList.js due to the dependency
    } catch (error) {
      console.error(error);
      setError('Failed to update product data');
    }
  };

  const handleDelete = async () => {
    try {
      // Delete the product from the products collection
      await axios.delete(`http://localhost:4000/products/${localProduct._id}`);

     // Fetch the basket items if the localProduct._id matches identity
     const response = await axios.get(`http://localhost:4000/basket?identity=${localProduct._id}`);
     const basketItems = response.data;

     // Iterate through the basket items array
     for (const basketItem of basketItems) {
       console.log(basketItem.identity, localProduct._id);
     
       if (basketItem && basketItem.identity === localProduct._id) {
         await axios.delete(`http://localhost:4000/basket?identity=${basketItem.identity}`);
         console.log(`Basket item with identity ${basketItem.identity} Deleted successfully`);
       } else {
         console.log(`Basket item with identity ${basketItem.identity} not found`);
       }
     }
 
     alert('Product Deleted Successfully');
     setError(null);
     onDelete(localProduct._id); // Updates the ProductEditList.js due to the dependency
   } catch (error) {
     console.error(error);
     setError('Failed to update product data');
   }
 };

  return (
    <div className="mb-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={localProduct.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={localProduct.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            name="descript"
            value={localProduct.descript}
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
        {imagePreview && (
          <div className="mb-4">
            <img src={imagePreview} alt={localProduct.name} className="w-full h-64 object-cover rounded" />
          </div>
        )}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;