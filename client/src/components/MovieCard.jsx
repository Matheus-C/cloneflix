import { Link } from "react-router-dom";
import "./css/MovieCard.css";

export default function MovieCard({ movie }) {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "";

  return (
    <Link to={`/title/${movie.imdbID}`} className="movie-card">
      <img src={poster} alt={movie.Title} loading="lazy" />
      <div className="movie-card__info">
        <h4>{movie.Title}</h4>
        <span>{movie.Year}</span>
      </div>
    </Link>
  );
}
