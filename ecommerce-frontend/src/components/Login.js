import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token); // Salvează token-ul în localStorage
      alert("Autentificare reușită!");
      window.location.href = "/dashboard"; // Redirecționează utilizatorul
    } catch (error) {
      alert("Autentificare eșuată. Verifică datele introduse.");
    }
  };

  return (
    <div>
      <h2>Autentificare</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nume utilizator"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parolă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
