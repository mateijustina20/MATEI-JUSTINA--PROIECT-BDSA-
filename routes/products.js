// backend/routes/products.js
const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');

// Rutele pentru produsele API
router.get('/', getProducts);

module.exports = router;
