import styles from "./header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  const activeStyles = {
    backgroundColor: "#4fffa5",
    padding: "10px 20px",
    borderRadius: "4px",
  };

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <h1>QualFilme</h1>
      </NavLink>
      <nav className={styles.navbar}>
        <NavLink
          to="/filmes"
          className={styles.nav}
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Filmes
        </NavLink>
        <NavLink
          to="/series"
          className={styles.nav}
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Séries
        </NavLink>
      </nav>
    </header>
  );
}
