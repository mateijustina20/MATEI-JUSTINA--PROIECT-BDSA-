// backend/controllers/productController.js
const Product = require('../models/Product'); // Importă modelul

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products); // Răspunde cu lista de produse
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la obținerea produselor.' });
  }
};

module.exports = { getProducts };
