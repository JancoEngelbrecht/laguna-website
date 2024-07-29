const express = require('express');
const schemas = require('../models/schemas');
const sgMail = require('@sendgrid/mail');

const router = express.Router();

// Add contact to the Database
router.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const contactData = { name, email, phone, message };
    const newContact = new schemas.Contact(contactData);
    const saveContact = await newContact.save();
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Send email to owner
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