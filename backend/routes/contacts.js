const express = require('express');
const schemas = require('../models/schemas');
const sgMail = require('@sendgrid/mail');

const router = express.Router();

// Add contact to the Database (with user association)
router.post('/contact', async (req, res) => {
  const { name, email, phone, message, auth0Id } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const contactData = { name, email, phone, message };
    
    // Check if user exists by auth0Id (if user is authenticated)
    let user;
    if (auth0Id) {
      user = await schemas.User.findOne({ auth0Id });
    }

    if (user) {
      // If the user exists, append the contact data to the user's contacts array
      user.contacts.push(contactData);
      await user.save();
    } else {
      // If the user doesn't exist (or is anonymous), create a new user document
      user = new schemas.User({
        auth0Id: auth0Id || null,  // Will be null if anonymous
        contacts: [contactData],
      });
      await user.save();
    }

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Send email to owner using SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/api/contactus', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailContent = `
    <h2>New Customer Enquiry</h2>
    <p><strong>Name:</strong> ${name} </p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  const msg = {
    to: 'engelbrechtjanco@gmail.com', // Change to your recipient
    from: 'engelbrechtjanco@gmail.com', // Change to your verified sender
    subject: 'New Customer Enquiry',
    text: 'New Customer Enquiry:',
    html: emailContent,
  };
  
  try {
    const response = await sgMail.send(msg);
    console.log(response[0].statusCode);
    console.log(response[0].headers);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;