import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Funcția pentru a obține produsele de la API-ul back-end
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data); // Setează lista de produse
      } catch (error) {
        console.error('Eroare la obținerea produselor:', error);
      }
    };

    fetchProducts(); // Apelează funcția la montarea componentei
  }, []); // Se execută o singură dată

  return (
    <div>
      <h1>Lista de Produse</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Preț: {product.price} RON</p>
            <button onClick={() => addToCart(product)}>Adaugă în Coș</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
