import { useRef } from "react";
import MovieCard from "./MovieCard";
import "./css/Carousel.css";

export default function Carousel({ title, items }) {
  const ref = useRef(null);
  if (!items?.length) return null;

  const scroll = (dir) => {
    if (ref.current)
      ref.current.scrollBy({ left: dir * 600, behavior: "smooth" });
  };

  return (
    <section className="carousel">
      <h2>{title}</h2>
      <div className="carousel__wrapper">
        <button className="carousel__btn left" onClick={() => scroll(-1)}>
          ‹
        </button>
        <div className="carousel__track" ref={ref}>
          {items.map((m) => (
            <MovieCard key={m.imdbID} movie={m} />
          ))}
        </div>
        <button className="carousel__btn right" onClick={() => scroll(1)}>
          ›
        </button>
      </div>
    </section>
  );
}
