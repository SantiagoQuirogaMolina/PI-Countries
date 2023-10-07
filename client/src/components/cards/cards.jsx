import React, { useState } from "react";
import Card from "../card/card";
import style from "../cards/cards.module.css";
import "./Cards.module.css";
function Cards({ allCountries }) {
  // Definir el número de elementos por página
  const itemsPerPage = 8;

  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el índice de inicio y final de la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener los países para la página actual
  const countriesToShow = allCountries.slice(startIndex, endIndex);

  // Función para cambiar de página
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className={style.div}>
        {countriesToShow.map((country, index) => (
          <Card key={index} country={country} />
        ))}
        {/* Controles de paginación */}
      </div>
      <div className={style.paginationContainer}>
        <button
          className={style.paginationButton}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className={style.paginationPage}>Página {currentPage}</span>
        <button
          className={style.paginationButton}
          onClick={() => goToPage(currentPage + 1)}
          disabled={endIndex >= allCountries.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Cards;
