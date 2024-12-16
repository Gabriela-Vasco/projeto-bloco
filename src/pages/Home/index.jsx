import { useParams, useNavigate } from "react-router-dom";
import styles from "./home.module.css";

export default function Main() {
  const { mood } = useParams();

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/${mood}/${path}`);
  };

  return (
    <div className={styles.main}>
      {mood === "filmes" ? (
        <h1>Encontre seu próximo filme</h1>
      ) : (
        <h1>Encontre sua próxima série</h1>
      )}
      <div className={styles.menuCards}>
        <button onClick={() => handleNavigation("aleatorio")}>Aleatório</button>
        <button onClick={() => handleNavigation("personalizado")}>
          Personalizado
        </button>
        <button onClick={() => handleNavigation("humor")}>Humor</button>
        <button onClick={() => handleNavigation("lista")}>Lista completa</button>
      </div>
    </div>
  );
}
