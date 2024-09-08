const express = require('express');

const contactsRouter = require('./contacts');
const productsRouter = require('./products');
const auth0Router = require('./auth0');
const userBasket = require('./userBasket');
const salesOrder = require('./salesOrder')

const router = express.Router();

router.use(contactsRouter);
router.use(productsRouter);
router.use(auth0Router);
router.use(userBasket);
router.use(salesOrder)

module.exports = router;
