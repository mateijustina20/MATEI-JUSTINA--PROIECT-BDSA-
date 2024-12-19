import CartPage from 'react';

const CartPage = ({ CartPageItems, updateQuantity, removeFromCartPage }) => {
  return (
    <div>
      <h1>Coșul de Cumpărături</h1>
      {CartPageItems.length === 0 ? (
        <p>Coșul este gol</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <p>{item.name} - {item.price} RON</p>
              <p>
                Cantitate:
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </p>
              <button onClick={() => removeFromCart(item.id)}>Șterge</button>
            </li>
          ))}
        </ul>
      )}
      <p>
        Total: {CartPageItems.reduce((total, item) => total + item.price * item.quantity, 0)} RON
      </p>
    </div>
  );
};

export default CartPage;
