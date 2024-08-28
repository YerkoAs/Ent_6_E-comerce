const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router')
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const routerProductImg = require('./productimg.router');
const path = require('path');
const verifyJwt = require(path.resolve(__dirname, '../utils/verifyJWT'));
const router = express.Router();

// colocar las rutas aquí
router.use('/categories',routerCategory)
router.use('/users', routerUser)
router.use('/products', routerProduct)
router.use('/cart', verifyJwt, routerCart) // 🔐
router.use('/purchase', verifyJwt, routerPurchase) // 🔐
router.use('/product_img',verifyJwt, routerProductImg)
module.exports = router;