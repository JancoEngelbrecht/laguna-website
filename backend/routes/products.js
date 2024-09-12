const express = require('express');
const schemas = require('../models/mongodbschemas');

const router = express.Router();

// Add a Company Product to the ProductSchema
router.post('/products', async (req, res) => {
  try {
    const { name, price, image, descript } = req.body;

    const productData = { name, price, image, descript };
    const newProduct = new schemas.Product(productData);
    const saveProduct = await newProduct.save();

    if (saveProduct) {
      console.log("Product Submit Successful to Company Products");
      res.json(productData);
    } else {
      res.send('Failed to submit Product to Company Products');
    }
  } catch (error) {
    console.error('Error submitting Product to Company Products', error);
    res.status(500).json({ error: 'Internal Server Error: Company Products POST' });
  }
});

// Retrieve all Products from the DataBase
router.get('/products', async (req, res) => {
  try {
    const products = await schemas.Product.find();

    // Format price to have 2 decimals
    const productsWithFormattedPrice = products.map(product => ({
      ...product.toObject(),
      price: parseFloat(product.price).toFixed(2),
    }));

    res.status(200).json(productsWithFormattedPrice);
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).json({ message: 'Internal Server Error: Company Product GET' });
  }
});

// Retrieve all products from Database with their IDs
router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await schemas.Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Update product in the Database per their IDs
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await schemas.Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update Company product' });
  }
});

// Delete product from Company Products using their productIDs
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await schemas.Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found in Company Products' });
    }
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product from Company Products' });
  }
});

module.exports = router;