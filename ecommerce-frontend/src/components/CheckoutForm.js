import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    if (!stripe || !elements) return; // Stripe.js încă se încarcă

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
      } else {
        // Trimite paymentMethod.id către backend pentru procesare
        const response = await axios.post('http://localhost:5000/api/charge', {
          paymentMethodId: paymentMethod.id,
        });

        if (response.data.success) {
          setSuccess(true);
        } else {
          setError('Plata a eșuat. Încercați din nou.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('O eroare a avut loc.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Plătește
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Plata a fost realizată cu succes!</p>}
    </div>
  );
}

export default CheckoutForm;
