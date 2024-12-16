import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PersonalizedRecommendation.module.css";

import { discoverItem, listGenres, searchPerson } from "../../api";


export function PersonalizedRecommendation() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    director: "",
  });
  const [genres, setGenres] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mood } = useParams();

  useEffect(() => {
    const fetchGenres = async () => {
      const endpoint = mood === "filmes" ? "movie" : "tv";
      try {
        const data = await listGenres(endpoint);
        setGenres(data);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, [mood]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const results = await discoverItem( mood === "filmes" ? "movie" : "tv", formData.genre, formData.year, formData.title);

      if (formData.director) {
        const directorData = await searchPerson(formData.director);

        if (directorData.length > 0) {
          const director = directorData[0];
          const directorWorks = new Set(
            director.known_for.map((work) => work.id)
          );

          results = results.filter((item) => directorWorks.has(item.id));
        } else {
          results = [];
        }
      }

      setResults(results);
    } catch (error) {
      console.error("Failed to fetch personalized recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.personalizedContainer}>
      <div className={styles.titleContainer}>
        <button onClick={() => navigate(-1)} className={styles.btn}>
          Voltar
        </button>
        <h2>
          {mood === "filmes"
            ? "Recomendação personalizada de filmes"
            : "Recomendação personalizada de séries"}
        </h2>
      </div>
      <form onSubmit={handleSearch} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">
            Nome {mood === "filmes" ? "do filme" : "da série"}:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Digite o nome"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="genre">Gênero:</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
          >
            <option value="">Selecione um gênero</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="year">Ano:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="Digite o ano"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="director">Diretor:</label>
          <input
            type="text"
            id="director"
            name="director"
            value={formData.director}
            onChange={handleInputChange}
            placeholder="Digite o nome do diretor"
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Buscar
        </button>
      </form>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className={styles.results}>
          {results.length > 0 ? (
            results.map((item) => (
              <div key={item.id} className={styles.card}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className={styles.poster}
                />
                <h3>{item.title || item.name}</h3>
                <p>
                  <strong>Data de lançamento:</strong>{" "}
                  {formatDate(item.release_date || item.first_air_date)}
                </p>
              </div>
            ))
          ) : (
            <p>Nenhum resultado encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}
