const express = require('express');
const schemas = require('../models/schemas');

const router = express.Router();

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

module.exports = router;