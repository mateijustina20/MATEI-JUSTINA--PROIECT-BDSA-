const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');
const User = require('./User');

const cartRoutes = sequelize.define('Cart', {
  quantity:
   {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = cartRoutes;
