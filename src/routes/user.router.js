const { getAll, create, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const path = require('path');
const verifyJwt = require(path.resolve(__dirname, '../utils/verifyJWT'));


const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJwt, getAll)
    .post(create);

routerUser.route('/login')
    .post(login)

routerUser.route('/:id')
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerUser;