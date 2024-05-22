const mongoose = require('mongoose')
const Schema = mongoose.Schema
const contactSchema = new Schema({
    name:{type: String, required:true}, 
    email:{type: String, required:true},
    message:{type: String,required:true},
    entryDate: {type:Date, default:Date.now}
});

const Contact = mongoose.model('Contact', contactSchema, 'contact_form');

const productSchema = new Schema({
    name: {type: String},
    price: {type: mongoose.Types.Decimal128}, 
    image: {type: String},
    descript: {type: String},
});


const Product = mongoose.model('Product', productSchema, 'products')
const mySchemas = {'Contact': Contact, 'Product': Product}

module.exports = mySchemas