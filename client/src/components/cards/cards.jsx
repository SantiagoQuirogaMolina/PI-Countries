import React, { useState, useEffect } from "react";
import Card from "../card/card";
import style from "./cards.module.css";

function Cards({ allCountries }) {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    // Calcula los países para mostrar en la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCountries = allCountries.slice(startIndex, endIndex);
    setCountriesToShow(currentCountries);
  }, [allCountries, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= Math.ceil(allCountries.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className={style.div}>
        {countriesToShow.map((country, index) => (
          <Card key={index} country={country} />
        ))}
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
          disabled={currentPage === Math.ceil(allCountries.length / itemsPerPage)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Cards;
