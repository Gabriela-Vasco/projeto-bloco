import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./RandomChoice.module.css";
import { listPopularItens, listSingleItem } from "../../api";

export function RandomChoice() {
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const { mood } = useParams();

  useEffect(() => {
    const fetchRandomItem = async () => {
      try {
        const endpoint = mood === "filmes" ? "movie" : "tv";

        const data = await listPopularItens(endpoint);

        if (data?.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const chosenItem = data[randomIndex];
          const itemDetails = await listSingleItem(endpoint, chosenItem.id);
          setItem(itemDetails);
        }
      } catch (error) {
        console.error("Failed to fetch a random item:", error);
      }
    };

    fetchRandomItem();
  }, [mood]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.randomContainer}>
      <div className={styles.titleContainer}>
        <button onClick={() => navigate(-1)} className={styles.btn}>
          Voltar
        </button>
        <h1>{mood === "filmes" ? "Filme aleatório" : "Série aleatória"}</h1>
      </div>
      <div className={styles.container}>
        {item ? (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className={styles.poster}
            />
            <div className={styles.textContent}>
              <h1 className={styles.title}>{item.title || item.name}</h1>
              <h4 className={styles.tagline}>{item.tagline}</h4>
              <div className={styles.genres}>
                {item.genres.map((genre, index) => (
                  <p className={styles.genre} key={index}>
                    {genre.name}
                  </p>
                ))}
              </div>
              <p className={styles.overview}>{item.overview}</p>
              <p className={styles.details}>
                <strong>Data de lançamento:</strong>{" "}
                {formatDate(item.release_date || item.first_air_date)}
              </p>
              <p className={styles.details}>
                <strong>Votos:</strong> {item.vote_average} / 10 (
                {item.vote_count} votos)
              </p>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}
