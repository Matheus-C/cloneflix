import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchTitles, getTitleById } from "../api/omdb";
import "./css/Banner.css";

const FEATURED_QUERIES = ["Avengers", "Batman", "Inception", "Interstellar"];

export default function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const load = async () => {
      const q =
        FEATURED_QUERIES[Math.floor(Math.random() * FEATURED_QUERIES.length)];
      const list = await searchTitles(q);
      if (!list.length) return;
      const picked = list[Math.floor(Math.random() * list.length)];

      const details = await getTitleById(picked.imdbID);
      if (details && details.Response !== "False") {
        setMovie(details);
      } else {
        setMovie(picked); // fallback: usa o resumo se os detalhes falharem
      }
    };
    load();
  }, []);

  if (!movie) return <div className="banner banner--empty" />;

  const bg = movie.Poster !== "N/A" ? movie.Poster : "";
  const imdb = movie.Ratings?.find(
    (r) => r.Source === "Internet Movie Database",
  );
  const rating = imdb ? imdb.Value : movie.imdbRating || null;

  return (
    <header className="banner" style={{ backgroundImage: `url(${bg})` }}>
      <div className="banner__overlay">
        <h1>{movie.Title}</h1>
        <p>
          {movie.Year} • IMDb: {rating !== null ? rating : "Indisponível"}
        </p>
        <div className="banner__actions">
          <Link to={`/title/${movie.imdbID}`} className="banner__btn play">
            ▶ Assistir
          </Link>
          <Link to={`/title/${movie.imdbID}`} className="banner__btn info">
            ℹ Mais informações
          </Link>
        </div>
      </div>
    </header>
  );
}
