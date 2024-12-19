const { Sequelize } = require('sequelize');

// Configurarea conexiunii la baza de date
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
  logging: false, // Dezactivează log-ul
});

// Testarea conexiunii la baza de date
sequelize.authenticate()
  .then(() => console.log('Conexiunea la baza de date a fost stabilită cu succes.'))
  .catch((error) => console.error('Eroare la conectarea la baza de date:', error));

module.exports = sequelize;
