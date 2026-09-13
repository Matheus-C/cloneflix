import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchTitles } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import "./css/Search.css";

export default function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    searchTitles(query).then((r) => {
      setResults(r);
      setLoading(false);
    });
  }, [query]);

  return (
    <div className="search">
      <h1>Resultados para "{query}"</h1>
      {loading && <p>Buscando...</p>}
      {!loading && results.length === 0 && <p>Nenhum resultado encontrado.</p>}
      <div className="search__grid">
        {results.map((m) => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>
    </div>
  );
}
