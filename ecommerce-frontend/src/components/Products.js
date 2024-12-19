// src/components/Products.js
import React, { useState, useEffect } from 'react';

const Products = ({ addToCart }) => {
  // Lista de produse simulată
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulăm obținerea produselor de la un API sau o bază de date
    const fetchedProducts = [
      { id: 1, name: 'Produs 1', description: 'Descriere Produs 1', price: 100 },
      { id: 2, name: 'Produs 2', description: 'Descriere Produs 2', price: 150 },
      { id: 3, name: 'Produs 3', description: 'Descriere Produs 3', price: 200 },
      { id: 4, name: 'Produs 4', description: 'Descriere Produs 4', price: 250 }
    ];

    setProducts(fetchedProducts); // Setăm produsele în stare
  }, []);

  return (
    <section>
      <h2>Lista de Produse</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Preț: {product.price} RON</strong></p>
            <button onClick={() => addToCart(product)}>Adaugă în Coș</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
