/*const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_yourSecretKey"); // Înlocuiește cu cheia ta secretă Stripe

const app = express();
app.use(bodyParser.json());

// Secretul pentru semnarea JWT
const SECRET_KEY = "secretul_meu_super_sigur";

// Simulăm o bază de date în memorie
const users = [
  { id: 1, username: "admin", password: bcrypt.hashSync("password123", 10), role: "admin" },
  { id: 2, username: "user", password: bcrypt.hashSync("password456", 10), role: "user" }
];

// Generare JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
};

// Middleware pentru verificarea JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Preluăm token-ul din header
  if (!token) return res.status(401).send("Autentificare necesară.");

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Token invalid sau expirat.");
    req.user = user;
    next();
  });
};

// Middleware pentru permisiuni
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send("Acces interzis.");
  }
  next();
};

// Ruta de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send("Nume de utilizator sau parolă incorecte.");
  }

  const token = generateToken(user);
  res.json({ token });
});

// Rută protejată (pentru toți utilizatorii autentificați)
app.get("/protected", authenticateToken, (req, res) => {
  res.send(`Bun venit, utilizator cu ID-ul ${req.user.id} și rolul ${req.user.role}.`);
});

// Rută doar pentru admini
app.get("/admin", authenticateToken, authorize(["admin"]), (req, res) => {
  res.send("Bun venit în panoul de administrare.");
});

// Rută pentru procesarea plății cu Stripe
app.post("/create-payment-intent", authenticateToken, async (req, res) => {
  try {
    const { amount } = req.body; // Prețul pe care îl trimitem din frontend (în centi)

    // Creăm un PaymentIntent pe serverul Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Suma în centi (ex: 1000 = 10.00 USD)
      currency: "usd", // Moneda
    });

    // Răspundem cu client_secret-ul pentru a finaliza plata pe frontend
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Pornim serverul
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
*/



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('SECRET_KEY_STRIPE'); // Înlocuiește cu cheia ta secretă Stripe

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint pentru procesarea plății
app.post('/api/charge', async (req, res) => {
  const { paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // suma în cenți (10.00 RON)
      currency: 'ron',
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Eroare la procesarea plății:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
