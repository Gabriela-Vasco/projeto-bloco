import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MoodBasedRecommendation.module.css";
import { discoverItem } from "../../api";

const GENRES = {
  alegria: ["28", "12", "35"],
  medo: ["27", "53", "9648"],
  apaixonado: ["10749"],
  triste: ["18"],
};

export function MoodBasedRecommendation() {
  const { mood } = useParams();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMoodSelection = async (emotion) => {
    setSelectedMood(emotion);
    setLoading(true);
    setRecommendations([]);

    try {
      const data = await discoverItem( mood === "filmes" ? "movie" : "tv", GENRES[emotion].join(",") );
      setRecommendations(data);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.moodContainer}>
      <div className={styles.titleContainer}>
        <button onClick={() => navigate(-1)} className={styles.button}>
          Voltar
        </button>
        <h2>
          Recomendações baseadas no seu humor -{" "}
          {mood === "filmes" ? "Filmes" : "Séries"}
        </h2>
      </div>
      <div className={styles.moodButtons}>
        <button
          onClick={() => handleMoodSelection("alegria")}
          className={styles.moodButton}
        >
          😊
        </button>
        <button
          onClick={() => handleMoodSelection("apaixonado")}
          className={styles.moodButton}
        >
          ❤️
        </button>
        <button
          onClick={() => handleMoodSelection("triste")}
          className={styles.moodButton}
        >
          😢
        </button>
        <button
          onClick={() => handleMoodSelection("medo")}
          className={styles.moodButton}
        >
          😱
        </button>
      </div>
      {loading ? (
        <h1>Carregando recomendações...</h1>
      ) : (
        <div className={styles.results}>
          {recommendations.map((item) => (
            <div className={styles.card} key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className={styles.poster}
              />
              <h3 className={styles.title}>{item.title || item.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
