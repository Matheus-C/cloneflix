import { useEffect, useState } from "react";
import VideoModal from "../components/VideoModal";
import { useParams, useNavigate } from "react-router-dom";
import { getTitleById } from "../api/omdb";
import "./css/Details.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTitleById(id).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [id]);

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

  const poster = data.Poster && data.Poster !== "N/A" ? data.Poster : noImg;

  const ratings = data.Ratings || [];
  const imdb = ratings.find((r) => r.Source === "Internet Movie Database");

  return (
    <div className="details">
      <button className="details__back" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div
        className="details__hero"
        style={{ backgroundImage: `url(${poster})` }}
      >
        <div className="details__overlay" />
      </div>

      <div className="details__content">
        <img src={poster} alt={data.Title} className="details__poster" />

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
