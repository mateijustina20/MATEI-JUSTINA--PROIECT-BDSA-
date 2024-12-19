import React from 'react';

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  // Calcularea totalului coșului
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Coșul de Cumpărături</h2>
      {cartItems.length === 0 ? (
        <p>Coșul este gol</p>
      ) : (
        <div>
          {cartItems.map((item) => (
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
        </div>
      )}
    </div>
  );
};

export default Cart;
