const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv/config'); // Load environment variables

const app = express();

// Set up body parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Set up CORS options
const corsOptions = {
    origin: '*', 
    credentials: true, 
    optionSuccessStatus: 200 
};

// Use CORS middleware
app.use(cors(corsOptions));

// Use the main router index
const routes = require('./routes'); 
app.use('/', routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB Connected!'))
.catch((err) => console.log('DB Connection Error:', err));

// Start the server
const port = process.env.PORT || 4000; // Set the port from environment variables or default to 4000
const server = app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

// NOTES
    //1. 
        // Import Node.js Framework for webservers
        // Allow the use of different URLs/origins
        // Change Formats
        // Module containing routes
        // instance of Express created to be able to use its methods.
    
    //2.
        // Mount Middleware on Express Application
        // How to format incoming data and make it accesible in the req.body{} (Request Body)
        // JSON will be added to the req.body{"name":"John"}
        // URL-encoded would be added to the req.body{"name":"John"}
    
    //3. 
        // Set up the CORS options
        // Which origins are allowed
        // Sending cookies and authorization headers allowed?
        //  If preflight request by the client is a success, then make the response to client 200
        // Preflight request --> ask the server to respond with CORS Headers
        // CORS Headers -->  Tells the client that the server allows the requested resource to be accessed from the specified origin and with the specified HTTP methods and headers.

    //4. 
        // Mount CORS options on Express Application, so it can execute for all incomming requests.
        // Mount Router middleware at root path of Express application. 
        // Router will handle incoming requests based on their paths. 

    //5. 
        //Port on which the server will listen for incoming connections



// app.listen(port, ()=>{} ) -> Starts the server
// Callback function will be executed once the server starts successfully

// ()=>{}
    //  () --> list of parameters that the function accepts
    //  => --> separates the parameters from the body
    //  {} --> function body containing instructions 

// EXAMPLE of how the normal function would look without a callback. 
    // const server = app.listen(port, func())
    // function func () {
    //     console.log(`Server is running on ${port}`)
    // }