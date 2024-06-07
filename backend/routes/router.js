const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');

router.use(express.json());

/*___________________________POST__________________________*/
// Add contact to the Database
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const contactData = { name, email, message };
  const newContact = new schemas.Contact(contactData);
  const saveContact = await newContact.save();
  if (saveContact) {
    res.status(200).json({ message: 'Form submitted successfully' });
  } else {
    res.send('Failed to submit Form');
  }

  res.end();
});

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

/*___________________________GET__________________________*/

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

  res.end();
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

  res.end();
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

  res.end();
});

// Retrieve Customer Products with IDs from the Basket
router.get('/basket', async (req, res) => {
  try {
    const { identity } = req.query; // Extract 'identity' from query parameters
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

/*___________________________PUT__________________________*/

// Update product in the Database per their IDs
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await schemas.Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update Company product' });
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

// Update BasketProduct in the Database per their IDs
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

/*___________________________DELETE__________________________*/

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

module.exports = router;






// Form submitting:
    // 1. Submit form --> POST request to server-side script to process data
    // 2. Server-side scrip handels data and generates a response to display on webpage/terminal
    // If your post does not save the code to a database or storage of some sort, then when you get request the same endpoint, nothing will return. 
    // The server does not save the code you submit, it only handles the requests for you
    //POST Request --> Ex. Send data to a database in a request body.
    //GET Request --> Ex. Browsers use GET request when you navigate to the URL, which is why you will technically not POST to a WebPage. 

// NOTES
    //1.
        // What should the Server do when the routes are accessed and what handler(POST,GET) is allowed
        // If the handler is POST, then the client must make a post request to the route/endpoint
        // Import Node.js Framework for webservers
        // New Router instance using the Router Class of Express (Like a mini App)

    //2.
        // Parse the Request Body in the form that fits your routes. 
        // Only JSON client data will be accepted by these routes, Form-urlencoded will not work.
        // Middleware to parse JSON request bodies, since the server parses both JSON and Form-urlencoded

    //3.
        // Specifiy the handler (POST, GET etc)
        // then the URL Endpoint (/contact)
        // Then the function in the posts takes to arguments Request (Req) and Response (Res).
        // So the server takes in the request body and sends a response after some code has been executed.
        // Unpacking code to make it cleaner. Basically assigning const name = req.body.name
        // Common practice to include a status Response 

    //4. 
        // Module.exports is Node.js object. It is the Node.js export module.
        // When you are working with the Server you use Node.js, therefore you export the module differently than in React JS. 