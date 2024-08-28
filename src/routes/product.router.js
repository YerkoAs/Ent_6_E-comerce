const { getAll, create, getOne, remove, update } = require('../controllers/product.controllers');
const express = require('express');
const path = require('path');
const verifyJwt = require(path.resolve(__dirname, '../utils/verifyJWT'));


const routerProduct = express.Router();

routerProduct.route('/')
    .get(getAll)
    .post(verifyJwt, create);

routerProduct.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerProduct;