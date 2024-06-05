const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Contact Us Schema
const contactSchema = new Schema({
    name:{type: String, required:true}, 
    email:{type: String, required:true},
    message:{type: String,required:true},
    entryDate: {type:Date, default:Date.now}
});

const Contact = mongoose.model('Contact', contactSchema, 'contact_form');

// All Company Product Schema
const productSchema = new Schema({
    name: {type: String},
    price: {type: mongoose.Types.Decimal128}, 
    image: {type: String},
    descript: {type: String},
});

const Product = mongoose.model('Product', productSchema, 'products')

// Basket for Customer Checkout Schema
const basketSchema = new Schema({
    name: {type: String},
    price: {type: mongoose.Types.Decimal128}, 
    image: {type: String},
    descript: {type: String},
    quantity: {type: Number},
    identity: {type: String},
});

const Basket = mongoose.model('Basket', basketSchema, 'basket')


// Exporting Schemas
const mySchemas = {'Contact': Contact, 'Product': Product, 'Basket': Basket}
module.exports = mySchemas