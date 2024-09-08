const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Product Schema (Used for both owned products and basket items)
const userProductSchema = new Schema({
    name: { type: String },
    price: { type: mongoose.Types.Decimal128 },
    image: { type: String },
    descript: { type: String },
    quantity: { type: Number },
    identity: { type: String },
});

// Contact Schema (Now embedded within the User schema)
const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    message: { type: String, required: true },
    entryDate: { type: Date, default: Date.now }
});

// User Schema
const userSchema = new Schema({
    auth0Id: { type: String, unique: true, sparse: true }, // Auth0 ID for authenticated users (can be null for anonymous users)
    products: [userProductSchema], // Array of products owned by the user
    basket: [userProductSchema], // Array of products in the user's basket for checkout
    contacts: [contactSchema], // Array of contact form submissions made by the user
});

const User = mongoose.model('User', userSchema, 'users');

// Product Schema (Unchanged, remains a separate collection)
const productSchema = new Schema({
    name: { type: String },
    price: { type: mongoose.Types.Decimal128 },
    image: { type: String },
    descript: { type: String },
});

const Product = mongoose.model('Product', productSchema, 'products');

// Exporting Schemas
const mySchemas = { 'User': User, 'Product': Product };
module.exports = mySchemas;