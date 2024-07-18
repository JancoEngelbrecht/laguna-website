const express = require('express');

const contactsRouter = require('./contacts');
const productsRouter = require('./products');
const basketRouter = require('./basket');
const auth0Router = require('./auth0');
const userBasket = require('./userBasket');

const router = express.Router();

router.use(contactsRouter);
router.use(productsRouter);
router.use(basketRouter);
router.use(auth0Router);
router.use(userBasket);

module.exports = router;