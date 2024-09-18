const express = require('express');
const schemas = require('../models/mongodbschemas');
const mongoose = require('mongoose');

const router = express.Router();

// Add a Product to a User's Product List
router.post('/user/:auth0Id/products', async (req, res) => {
  try {
    const { auth0Id } = req.params;
    const { name, price, image, descript, quantity, identity } = req.body;

    // Convert the price to Decimal128
    const newProduct = {
      name,
      price: mongoose.Types.Decimal128.fromString(price.toString()),
      image,
      descript,
      quantity,
      identity
    };

    let user = await schemas.User.findOne({ auth0Id });

    if (!user) {
      user = new schemas.User({
        auth0Id,
        products: [newProduct], // Add to the user's product list
      });
    } else {
      user.products.push(newProduct); // Append the new product to existing products
    }

    await user.save();

    console.log("Product added to user's product list");
    res.json(newProduct);
  } catch (error) {
    console.error('Error adding product to user', error);
    res.status(500).json({ error: 'Internal Server Error: User Product POST' });
  }
});

// Retrieve All Products for a User
router.get('/user/:auth0Id/products', async (req, res) => {
  try {
    const { auth0Id } = req.params;
    const user = await schemas.User.findOne({ auth0Id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const products = user.products.map(product => {
      return {
        ...product.toObject(),
        price: parseFloat(product.price.toString()).toFixed(2) // Convert Decimal128 to float
      };
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products for user', error);
    res.status(500).json({ message: 'Internal Server Error: User Products GET' });
  }
});

// Retrieve a Specific Product for a User by Product ID
router.get('/user/:auth0Id/products/:productId', async (req, res) => {
  try {
    const { auth0Id, productId } = req.params;
    const user = await schemas.User.findOne({ auth0Id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = user.products.id(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Retrieve Users Who Have a Specific Product in Their Basket
router.get('/users/basketProducts/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const users = await schemas.User.find(
      { 'products.identity': productId }, // Look into the 'basket' field now
      'auth0Id products'
    ).lean();

    // Filter the basket items to only include those with the specific productId
    const result = users.map(user => {
      const filteredBasket = user.products.filter(product => product.identity === productId);
      return {
        auth0Id: user.auth0Id,
        products: filteredBasket
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching users with product in their basket', error);
    res.status(500).json({ error: 'Internal Server Error: Users with Product GET' });
  }
});

// Update a User's Product by Product ID
router.put('/user/:auth0Id/products/:productId', async (req, res) => {
  try {
    const { auth0Id, productId } = req.params;
    const { name, descript, image, price, quantity } = req.body;

    const user = await schemas.User.findOne({ auth0Id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = user.products.id(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.name = name || product.name;
    product.descript = descript || product.descript;
    product.price = price !== undefined ? mongoose.Types.Decimal128.fromString(price.toString()) : product.price;
    product.quantity = quantity || product.quantity;
    product.image = image || product.image;

    await user.save();

    // Convert price to two decimal places for the response
    const updatedProduct = {
      ...product.toObject(),
      price: parseFloat(product.price.toString()).toFixed(2)
    };

    res.json(updatedProduct);
  } catch (err) {
    console.error('Failed to update user product', err);
    res.status(500).json({ error: 'Failed to update user product' });
  }
});

// Delete a User's Product by Product ID
router.delete('/user/:auth0Id/products/:productId', async (req, res) => {
  try {
    const { auth0Id, productId } = req.params;

    const user = await schemas.User.findOne({ auth0Id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const productIndex = user.products.findIndex(product => product._id.toString() === productId);
 
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    user.products.splice(productIndex, 1); // Remove the product
    await user.save();

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Failed to delete product from user', err);
    res.status(500).json({ error: 'Failed to delete product from user' });
  }
});

module.exports = router;