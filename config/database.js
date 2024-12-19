// config/database.js
const { Sequelize } = require('sequelize');

// Conexiunea la baza de date (înlocuiește cu datele tale)
const sequelize = new Sequelize('mysql://user:password@localhost:3306/numele_bazei_de_date', {
  dialect: 'mysql',
  logging: false // Oprește logarea SQL pentru curățenie
});

module.exports = sequelize;
