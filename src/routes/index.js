const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router')
const router = express.Router();

// colocar las rutas aquí
router.use('/categories',routerCategory)
router.use('/users', routerUser)
module.exports = router;