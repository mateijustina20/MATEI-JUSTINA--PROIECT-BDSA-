
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Products from './components/Products'; // Importă componenta Products
import Cart from './components/Cart'; // Importă componenta Cart
import DatabaseSetup from './components/DatabaseSetup'; // Importă componenta DatabaseSetup
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './components/CheckoutForm'; // Componenta pentru form de checkout Stripe

const stripePromise = loadStripe('pk_test_51NxxxxxYOUR_KEYxxxxxxx'); // Înlocuiește cu cheia ta publică Stripe

function App() {
  const [cart, setCart] = useState([]); // Starea coșului de cumpărături
  const [user, setUser] = useState(null); // Starea utilizatorului autentificat

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Evită cantitățile negative
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleLogin = (username) => {
    setUser(username); // Salvează utilizatorul autentificat
  };

  const handleLogout = () => {
    setUser(null); // Resetează utilizatorul la delogare
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Bine ai venit în magazinul nostru online</h1>
          <nav>
            <ul>
              <li><Link to="/">Acasă</Link></li>
              <li><Link to="/about">Despre Noi</Link></li>
              <li><Link to="/services">Servicii</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/products">Produse</Link></li>
              <li><Link to="/cart">Coșul de Cumpărături</Link></li>
              <li><Link to="/database-setup">Setup Bază de Date</Link></li>
              <li><Link to="/checkout">Plată</Link></li>
              {user ? (
                <>
                  <li>Bun venit, {user}!</li>
                  <li><button onClick={handleLogout}>Delogare</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/database-setup" element={<DatabaseSetup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/checkout" 
            element={
              <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} />
              </Elements>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <section>
    <h2>Despre Aplicație</h2>
    <p>Bine ai venit în lumea magazinului nostru online, un loc unde îți punem la dispoziție o selecție diversificată de produse de calitate superioară, concepute pentru a răspunde nevoilor tale. Indiferent că ești în căutarea celor mai noi gadgeturi, articole de îmbrăcăminte elegante sau produse pentru casă, vei găsi tot ce îți dorești într-un singur loc, la prețuri accesibile. Explorează, descoperă și transformă-ți experiența de shopping într-o plăcere!</p>
  </section>
);

const About = () => (
  <section>
    <h2>Despre Noi</h2>
    <p> Noi suntem o companie dedicată să aducă cele mai bune produse și servicii pentru clienții noștri, punându-le întotdeauna pe primul loc. Misiunea noastră este să oferim soluții inovative și de înaltă calitate, care să răspundă nevoilor și dorințelor tale. Fiecare produs pe care îl comercializăm este ales cu grijă, iar serviciile noastre sunt concepute pentru a asigura o experiență de neuitat, caracterizată prin profesionalism, rapiditate și satisfacție garantată. Suntem aici pentru a îți îmbunătăți viața cu produse de top și o experiență excelentă de cumpărare!</p>
  </section>
);

const Services = () => (
  <section>
    <h2>Servicii</h2>
    <p>Cu noi, beneficiezi de livrare rapidă, astfel încât să îți primești produsele într-un timp scurt, direct la ușa ta. Echipa noastră de suport clienți este mereu pregătită să îți ofere asistență personalizată și soluții eficiente, pentru ca tu să ai o experiență fără griji. În plus, ne mândrim cu o gamă variată de produse de înaltă calitate, atent selecționate pentru a îți satisface cele mai înalte standarde și preferințe. Fiecare comandă este importantă pentru noi și ne asigurăm că primești doar ce este mai bun!</p>
  </section>
);

const Contact = () => (
  <section>
    <h2>Contact</h2>
    <p>Ne poți contacta prin email la <strong>support@store.com</strong></p>
<p> sau telefonic la <strong>+123456789</strong>.</p>

  </section>
);

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      onLogin(username);
      navigate('/'); // Redirecționează utilizatorul către pagina principală
    }
  };

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nume utilizator:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button type="submit">Autentificare</button>
      </form>
    </section>
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Utilizator înregistrat:', { username, password });
    alert('Înregistrare realizată cu succes!');
  };

  return (
    <section>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nume utilizator:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Parolă:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Înregistrează-te</button>
      </form>
    </section>
  );
};

export default App;
