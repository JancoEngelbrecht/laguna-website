const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config'); 

const app = express();

// Set up body parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Set up CORS options
const corsOptions = {
    origin: 'https://proud-desert-0a59d0b03.5.azurestaticapps.net', 
    credentials: true,
    optionSuccessStatus: 200
};

// Use CORS middleware
app.use(cors(corsOptions));

// Use the main router index
const routes = require('./routes'); 
app.use('/', routes);

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

