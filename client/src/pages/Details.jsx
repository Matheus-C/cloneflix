import { useEffect, useState } from "react";
import VideoModal from "../components/VideoModal";
import { useFavorites } from "../context/FavoritesContext";
import { useParams, useNavigate } from "react-router-dom";
import { getTitleById } from "../api/omdb";
import { noImg } from "../assets";
import "./css/Details.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bgImg, setBgImg] = useState(noImg);

  useEffect(() => {
    setLoading(true);
    getTitleById(id).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!data?.Poster || data.Poster === "N/A") {
      setBgImg(noImg);
      return;
    }

    const img = new Image();
    img.src = data.Poster;
    img.onload = () => setBgImg(data.Poster);
    img.onerror = () => setBgImg(noImg);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [data]);

  if (loading)
    return (
      <div className="details">
        <p>Carregando...</p>
      </div>
    );
  if (!data || data.Response === "False")
    return (
      <div className="details">
        <p>Título não encontrado.</p>
      </div>
    );

  const ratings = data.Ratings || [];
  const imdb = ratings.find((r) => r.Source === "Internet Movie Database");
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(data.imdbID);
  return (
    <div className="details">
      <button className="details__back" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div
        className="details__hero"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="details__overlay" />
      </div>

      <div className="details__content">
        <img
          src={bgImg}
          alt={data.Title}
          className="details__poster"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = noImg;
          }}
        />

        <div className="details__info">
          <h1>{data.Title}</h1>

          <div className="details__meta">
            <span>{data.Year}</span>
            <span>{data.Rated}</span>
            <span>{data.Runtime}</span>
            {imdb && <span className="rating">⭐ {imdb.Value} IMDb</span>}
          </div>

          <p className="details__plot">{data.Plot}</p>

          <ul className="details__list">
            <li>
              <strong>Gênero:</strong> {data.Genre}
            </li>
            <li>
              <strong>Diretor:</strong> {data.Director}
            </li>
            <li>
              <strong>Elenco:</strong> {data.Actors}
            </li>
            <li>
              <strong>Idioma:</strong> {data.Language}
            </li>
            <li>
              <strong>País:</strong> {data.Country}
            </li>
            <li>
              <strong>Prêmios:</strong> {data.Awards}
            </li>
          </ul>

          <button
            className="details__play"
            onClick={() => setIsModalOpen(true)}
          >
            ▶ Assistir
          </button>
          <button
            className={`details__fav ${fav ? "active" : ""}`}
            onClick={() => toggleFavorite(data)}
          >
            {fav ? "❤️ Nos favoritos" : "🤍 Favoritar"}
          </button>
        </div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        embedUrl={getEmbedUrl(data.Type, data.imdbID)}
        title={data.Title}
      />
    </div>
  );
}
