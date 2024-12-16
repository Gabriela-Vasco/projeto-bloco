import styles from "./ItemThumb.module.css";

export default function ItemThumb({ item, handleDetails }) {
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.container}>
        <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title}
            className={styles.poster}
        />
        <div>
          <h1 className={styles.title}>{item.title}</h1>
          <p className={styles.details}>
              <strong>Data de lançamento:</strong>{" "}
              {formatDate(item.release_date || item.first_air_date)}
          </p>
          <p className={styles.details}>
              <strong>Votos:</strong> {item.vote_average} / 10 (
              {item.vote_count} votos)
          </p>
          <button className={styles.button} onClick={handleDetails}>
            Ver detalhes</button>
        </div>
    </div>
  );
}
