const express = require('express');
const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');
const router = express.Router();
require('dotenv').config();

// Import the User model
const { User } = require('../models/schemas');  // Adjust the path to your schemas file

// Initialize SendGrid client
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/api/order', async (req, res) => {
  const { name, surname, email, phone, message, products, total, auth0Id } = req.body;

  // Validate required fields
  if (!name || !surname || !email || !phone || !message || !products || !total) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Fetch or create a user by auth0Id (if provided), or by email (for anonymous users)
    let user = await User.findOne({ auth0Id: auth0Id || null, email: email });

    if (!user) {
      // Create a new user if one doesn't exist (for anonymous orders)
      user = new User({
        auth0Id: auth0Id || null,
        products: [],
        basket: [],
        contacts: [],
      });
    }

    // Update the user's basket with the products from the order
    user.basket = products.map(p => ({
      name: p.name,
      price: mongoose.Types.Decimal128.fromString(p.price.toFixed(2)),
      image: p.image || '',
      descript: p.descript || '',
      quantity: p.quantity || 1,
      identity: p.identity || ''
    }));

    // Add a contact form submission for the order
    user.contacts.push({
      name: `${name} ${surname}`,
      email: email,
      phone: phone,
      message: message,
      entryDate: new Date()
    });

    // Save the user with updated basket and contact info
    await user.save();

    // Prepare email content
    const productList = products.map(p => `<li>${p.name} - R${p.price.toFixed(2)}</li>`).join('');
    const emailContent = `
      <h2>New Order</h2>
      <p><strong>Name:</strong> ${name} ${surname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
      <h3>Products</h3>
      <ul>${productList}</ul>
      <p><strong>Total:</strong> R${total.toFixed(2)}</p>
    `;

    // Send the email via SendGrid
    const msg = {
      to: 'engelbrechtjanco@gmail.com', // Change to your recipient
      from: 'engelbrechtjanco@gmail.com', // Change to your verified sender
      subject: 'New Order',
      text: 'This is the new order:',
      html: emailContent,
    };

    const response = await sgMail.send(msg);
    console.log(response[0].statusCode);
    console.log(response[0].headers);

    // Respond with success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the order and send email' });
  }
});

module.exports = router;