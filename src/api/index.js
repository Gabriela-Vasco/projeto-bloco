import axios from 'axios';

export async function listPopularItens(endpoint, page = 1) {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${endpoint}/popular`,
    params: { language: "pt-BR", page: page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API}`,
    },
  };

  const { data } = await axios.request(options)
  return data?.results;
}

export async function listSingleItem(endpoint, itemId) {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${endpoint}/${itemId}`,
    params: { language: "pt-BR" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API}`,
    },
  };

  const { data }  = await axios.request(options)
  return data;
}

export async function listGenres(endpoint) {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/genre/${endpoint}/list`,
    params: { language: "pt-BR" },
    headers: {
      accept: "application / json",
      Authorization: `Bearer ${process.env.REACT_APP_API}`,
    },
  };

  const { data } = await axios.request(options)

  return data?.genres;
}

export async function discoverItem(endpoint, genre, year, title) {
  let query = `https://api.themoviedb.org/3/discover/${endpoint}?api_key=${process.env.REACT_APP_API}&language=pt-BR`;

  if (genre) query += `&with_genres=${genre}`;
  if (year) query += `&primary_release_year=${year}`;
  if (title) query += `&query=${encodeURIComponent(title)}`;

  const options = {
    method: "GET",
    url: query,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API}`,
    },
  };

  const { data } = await axios.request(options)
  return data?.results;
}

export async function searchPerson(endpoint, query) {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/${endpoint}`,
    params: { query, language: "pt-BR" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API}`,
    },
  };

  const { data } = await axios.request(options)
  return data?.results;
}