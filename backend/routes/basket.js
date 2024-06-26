const express = require('express');
const schemas = require('../models/schemas');

const router = express.Router();

// Add a Customer Product to the Basket Schema
router.post('/basket', async (req, res) => {
  try {
    const { name, price, image, descript, quantity, identity } = req.body;

    const productData = { name, price, image, descript, quantity, identity };
    const newProduct = new schemas.Basket(productData);
    const saveProduct = await newProduct.save();

    if (saveProduct) {
      console.log("Product Submit Successful to Customer Basket");
      res.json(productData);
    } else {
      res.send('Failed to submit Product to Customer Basket');
    }
  } catch (error) {
    console.error('Error submitting Product', error);
    res.status(500).json({ error: 'Internal Server Error: Customer Basket POST' });
  }
});

// Retrieve Customer Products from the Basket
router.get('/basket', async (req, res) => {
  try {
    const products = await schemas.Basket.find();

    // Format price to have 2 decimals
    const productsWithFormattedPrice = products.map(product => ({
      ...product.toObject(),
      price: parseFloat(product.price).toFixed(2),
    }));

    res.status(200).json(productsWithFormattedPrice);
  } catch (error) {
    console.error('Error fetching products from Basket', error);
    res.status(500).json({ message: 'Internal Server Error: Customer Basket GET' });
  }
});

// Retrieve Customer Products with IDs from the Basket
router.get('/basket/:identity', async (req, res) => {
  try {
    const { identity } = req.params; // Extract 'identity' from query parameters
    const product = await schemas.Basket.findOne({ identity: identity }); // Find the product by 'identity'

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Update BasketProduct Quantity
router.put('/basket/:id', async (req, res) => {
  try {
    const updatedProduct = await schemas.Basket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update BasketProductQty' });
  }
});

// Update BasketProduct in the Database per their Identity
router.put('/basket', async (req, res) => {
  const { identity } = req.query;
  const { price, image, descript } = req.body;

  console.log(`Received update request for identity: ${identity}`);
  console.log('Update data:', { price, image, descript });

  try {
    const result = await schemas.Basket.updateMany(
      { identity: identity },
      { $set: { price, image, descript } }
    );

  } catch (error) {
    console.error('Error updating basket item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete BasketProducts based on their Identity
router.delete('/basket', async (req, res) => {
  const { identity } = req.query;

  console.log(`Received Delete request for identity: ${identity}`);

  try {
    const result = await schemas.Basket.deleteMany({ identity: identity });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No basket items found with the given identity' });
    }

    res.status(200).json({ message: 'Basket items deleted successfully' });
  } catch (error) {
    console.error('Error deleting basket item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete Product from Basket
router.delete('/basket/:id', async (req, res) => {
  try {
    const deletedProduct = await schemas.Basket.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found in Company Products' });
    }
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product from Company Products' });
  }
});

module.exports = router;