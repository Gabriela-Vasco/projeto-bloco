import styles from "./ItemCard.module.css";

export default function ItemCard({ item }) {
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
}
