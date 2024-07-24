const express = require('express');
const sgMail = require('@sendgrid/mail');
const router = express.Router();
require('dotenv').config();

// Initialize SendGrid client
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/api/order', async (req, res) => {
  const { name, surname, email, phone, message, products, total } = req.body;

  if (!name || !surname || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

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

  const msg = {
    to: 'engelbrechtjanco@gmail.com', // Change to your recipient
    from: 'engelbrechtjanco@gmail.com', // Change to your verified sender
    subject: 'New Order',
    text: 'This is the new order:',
    html: emailContent,
  };
  
  try {
    const response = await sgMail.send(msg);
    console.log(response[0].statusCode);
    console.log(response[0].headers);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;