const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const { token, amount } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source: token.id,
      description: 'E-commerce purchase',
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error during payment', error);
    res.status(500).json({ success: false, message: 'Payment failed' });
  }
});

module.exports = router;
