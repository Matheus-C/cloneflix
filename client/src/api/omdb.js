import axios from 'axios';

const KEY = import.meta.env.VITE_OMDB_KEY;
const BASE = 'https://www.omdbapi.com/';

// Busca títulos por termo
export const searchTitles = async (query, page = 1) => {
  if (!query) return [];
  const { data } = await axios.get(BASE, {
    params: { s: query, page, apikey: KEY },
  });
  return data.Search || [];
};

// Busca detalhes por IMDb ID
export const getTitleById = async (id) => {
  const { data } = await axios.get(BASE, {
    params: { i: id, plot: 'full', apikey: KEY },
  });
  return data;
};
