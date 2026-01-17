const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rating = sequelize.define('Rating', {
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }
}, {
  indexes: [{ unique: true, fields: ['UserId', 'StoreId'] }]
});

module.exports = Rating;