const { Sequelize } = require('sequelize');

// Configurare conexiune la baza de date Oracle
const sequelize = new Sequelize({
  dialect: 'oracle',
  host: '193.226.34.57',
  port: 1521,
  username: 'MATEIJ_BDSA_AN1',
  password: 'STUD',
  database: 'orclpdb',
  dialectOptions: {
    connectString: '193.226.34.57:1521/orclpdb',
  },
  logging: false, // Dezactivează afișarea interogărilor SQL (opțional)
});

module.exports = { sequelize };