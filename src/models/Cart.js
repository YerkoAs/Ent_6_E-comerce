const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    //userId
    //productId
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Cart;