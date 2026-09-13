import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import { searchTitles } from "../api/omdb";

const CATEGORIES = [
  { title: "Em Alta", query: "Marvel" },
  { title: "Ação", query: "Action" },
  { title: "Comédia", query: "Comedy" },
  { title: "Drama", query: "Drama" },
  { title: "Ficção Científica", query: "Sci-Fi" },
  { title: "Terror", query: "Horror" },
  { title: "Animação", query: "Animation" },
  { title: "Aventura", query: "Adventure" },
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const results = await Promise.all(
        CATEGORIES.map(async (c) => ({
          title: c.title,
          items: await searchTitles(c.query),
        })),
      );
      setCategories(results);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="home">
      <Banner />
      <div style={{ paddingTop: 24 }}>
        {loading ? (
          <p style={{ padding: "0 40px" }}>Carregando catálogo...</p>
        ) : (
          categories.map((c) => (
            <Carousel key={c.title} title={c.title} items={c.items} />
          ))
        )}
      </div>
    </div>
  );
}
