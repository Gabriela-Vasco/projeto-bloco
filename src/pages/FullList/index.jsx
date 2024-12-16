import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./FullList.module.css";
import ItemThumb from "../../components/ItemThumb";
import { listPopularItens } from "../../api";

export function FullList() {
  const [itens, setItens] = useState(null);
  const [page, setPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState("title");
  const navigate = useNavigate();
  const { mood } = useParams();

  useEffect(() => {
    loadItens()
        
  }, [mood, page]);

  async function loadItens() {
    const endpoint = mood === "filmes" ? "movie" : "tv";
    const data = await listPopularItens(endpoint, page);
    setItens(data);
  }

  function handleDetails(item) {
    const endpoint = mood === "filmes" ? "movie" : "tv";
    navigate(`/${endpoint}/lista/${item.id}`);
  }

  const sortItems = (items, criteria) => {
    if (!items) return [];

    return [...items].sort((a, b) => {
      if (criteria === "title") {
        const titleA = a.title || a.name || "";
        const titleB = b.title || b.name || "";
        return titleA.localeCompare(titleB);
      } else if (criteria === "popularity") {
        return b.popularity - a.popularity;
      } else if (criteria === "release_date") {
        const dateA = new Date(a.release_date || a.first_air_date || "");
        const dateB = new Date(b.release_date || b.first_air_date || "");
        return dateB - dateA;
      }
      return 0;
    });
  };

  const sortedItens = sortItems(itens, sortCriteria);

  function handlePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNext() {
    setPage(page + 1);
  }

  return (
    <div className={styles.randomContainer}>
      <div className={styles.titleContainer}>
        <button onClick={() => navigate(-1)} className={styles.btn}>
          Voltar
        </button>
        <h1>{mood === "filmes" ? "Filmes" : "Séries"}</h1>
      </div>

      <div className={styles.sortContainer}>
        <label htmlFor="sort">Ordenar por:</label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="title">Título</option>
          <option value="popularity">Popularidade</option>
          <option value="release_date">Data de Lançamento</option>
        </select>
      </div>

      <div className={styles.container}>
        {sortedItens && sortedItens.length > 0 ? (
          <>
            {sortedItens.map((item, index) => (
              <ItemThumb key={index} item={item} handleDetails={() => handleDetails(item)}
              />
            ))}
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
      <div className={styles.btnContainer}>
        <button onClick={handlePrev} className={styles.btn}>
          Página anterior
        </button>

        <span>Página {page}</span>

        <button onClick={handleNext} className={styles.btn}>
          Próxima pagina
        </button>
      </div>
    </div>
  );
}