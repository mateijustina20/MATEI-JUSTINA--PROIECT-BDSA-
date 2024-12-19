// Importă corect variabila sequelize din fișierul database.js
const { sequelize } = require('./models/database'); 

// Alte importuri și configurații
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

// Test DB connection
sequelize.sync().then(() => {
  console.log("Database connected.");
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
