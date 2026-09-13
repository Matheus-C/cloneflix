import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./css/MovieCard.css";
import { noImg } from "../assets";

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(movie.imdbID);

  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : noImg;

  const handleFav = (e) => {
    e.preventDefault(); // evita navegar para os detalhes
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Link to={`/title/${movie.imdbID}`} className="movie-card">
      <img
        src={poster}
        alt={movie.Title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = noImg;
        }}
      />
      <button
        className={`movie-card__fav ${fav ? "active" : ""}`}
        onClick={handleFav}
        title={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {fav ? "❤️" : "🤍"}
      </button>
      <div className="movie-card__info">
        <h4>{movie.Title}</h4>
        <span>{movie.Year}</span>
      </div>
    </Link>
  );
}
