// backend/app.js
const express = require('express');
const app = express();
const cors = require('cors');
const productRoutes = require('./routes/products');

app.use(cors()); // Permite cereri de pe alte domenii (pentru front-end)
app.use(express.json()); // Permite manipularea cererilor JSON

// Route pentru produsele API
app.use('/api/products', productRoutes);

app.listen(5000, () => {
  console.log('Serverul rulează pe portul 5000');
});
