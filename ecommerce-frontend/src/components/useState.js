import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();

  // State pentru gestionarea coșului și adresei de livrare
  const [cart, setCart] = useState(cartItems);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Calcularea totalului coșului
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Funcția pentru finalizarea comenzii
  const handleCheckout = () => {
    if (!cart.length) {
      alert("Coșul tău este gol. Te rugăm să adaugi produse.");
      return;
    }

    if (!shippingAddress || !paymentMethod) {
      alert("Te rugăm să completezi adresa de livrare și metoda de plată.");
      return;
    }

    // Crearea comenzii
    const order = {
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity,
      })),
      totalAmount: getTotal(),
      shippingAddress,
      paymentMethod,
      orderDate: new Date(),
    };

    // Golește coșul de cumpărături
    setCart([]);

    // Trimite comanda către server (dacă există un backend)
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Comanda a fost salvată cu succes:', data);
        alert("Comanda ta a fost plasată cu succes!");
        navigate('/order-success');  // Redirecționează către pagina de succes
      })
      .catch(error => {
        console.error('Eroare la procesarea comenzii:', error);
        alert("A apărut o eroare la procesarea comenzii.");
      });
  };

  return (
    <div>
      <h2>Coșul de Cumpărături</h2>
      {cart.length === 0 ? (
        <p>Coșul este gol</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="100" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.price} RON</p>
                <p>Cantitate: {item.quantity}</p>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>Adaugă</button>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>Scade</button>
                <button onClick={() => removeFromCart(item.id)}>Șterge</button>
              </div>
            </div>
          ))}
          <div>
            <h3>Total: {getTotal()} RON</h3>
          </div>

          {/* Formular pentru adresa de livrare și metoda de plată */}
          <div>
            <h4>Adresa de livrare</h4>
            <input 
              type="text" 
              value={shippingAddress} 
              onChange={(e) => setShippingAddress(e.target.value)} 
              placeholder="Introduceți adresa de livrare" 
            />
          </div>
          <div>
            <h4>Metoda de plată</h4>
            <select onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="">Selectați metoda de plată</option>
              <option value="Card">Card de credit</option>
              <option value="Ramburs">Ramburs</option>
            </select>
          </div>

          {/* Butonul pentru finalizarea comenzii */}
          <div>
            <button onClick={handleCheckout}>Plasează comanda</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
