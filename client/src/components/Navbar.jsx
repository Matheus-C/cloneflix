import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./css/Navbar.css";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        Cloneflix
      </Link>

      <form onSubmit={handleSubmit} className="navbar__search">
        <input
          type="text"
          placeholder="Buscar filmes, séries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="navbar__right">
        <span>Olá, {user?.name}</span>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
