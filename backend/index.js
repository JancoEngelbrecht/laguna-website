//Note 1.
const express = require('express') 
const cors = require('cors')
const bodyParser = require('body-parser') 
const router = require('./routes/router') 
const mongoose = require('mongoose')
require('dotenv/config') // Loads variables into the Node.js environment through the use of a dotemv package. Making them accesible to objects of Node.js. 

const app = express()  

//Note 2.
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//Note 3.
const corsOptions = {
    origin: '*', 
    credentials: true, 
    optionSuccessStatus: 200 
}

//Note 4.
app.use(cors(corsOptions)) 
app.use('/', router) 


mongoose.connect(process.env.DB_URI)
.then(() => console.log('DB Connected!'))
.catch((err) => console.log(err))

//Note 5.
const port = process.env.PORT || 4000 // Process is a object of Node.js, and it can access the .env variables in the Node.js environment. 
const server = app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})


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