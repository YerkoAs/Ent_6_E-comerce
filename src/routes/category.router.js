const { getAll, create, remove} = require('../controllers/category.controllers');
const express = require('express');
const path = require('path');
const verifyJwt = require(path.resolve(__dirname, '../utils/verifyJWT'));


const routerCategory = express.Router();

routerCategory.route('/')
    .get( getAll)
    .post(verifyJwt,create);

routerCategory.route('/:id')
    .delete(verifyJwt, remove)

module.exports = routerCategory;