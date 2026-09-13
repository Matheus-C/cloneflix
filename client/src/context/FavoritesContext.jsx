import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    api
      .get("/favorites")
      .then(({ data }) => setFavorites(data))
      .catch(() => setFavorites([]));
  }, [user]);

  const isFavorite = (imdbID) => favorites.some((f) => f.imdbID === imdbID);

  const toggleFavorite = async (movie) => {
    if (!user) return;
    if (isFavorite(movie.imdbID)) {
      const { data } = await api.delete(`/favorites/${movie.imdbID}`);
      setFavorites(data);
    } else {
      const { data } = await api.post("/favorites", {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        Type: movie.Type,
      });
      setFavorites(data);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
