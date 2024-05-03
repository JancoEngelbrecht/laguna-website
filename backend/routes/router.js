//Note 1
const express = require('express'); 
const router = express.Router();
const schemas = require('../models/schemas')

//Note 2
router.use(express.json()); 

//Note 3 
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body; 
    
    const contactData = {name: name, email: email, message: message}
    const newContact = new schemas.Contact(contactData)
    const saveContact = await newContact.save()
    if (saveContact) {
    res.status(200).json({ message: 'Form submitted successfully' });
    } else {
        res.send('Failed to submit Form')
    }

    res.end()
     
});


//Note 4 
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