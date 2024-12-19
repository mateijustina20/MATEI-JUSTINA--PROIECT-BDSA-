import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bine ați venit pe pagina principală</h1>
      <nav>
        <ul>
          <li><Link to="/about">Despre companie</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/products">Lista produse</Link></li>
          <li><Link to="/services">Servicii</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
