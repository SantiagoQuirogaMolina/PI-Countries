import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesByName, getCountries } from "../../Redux/action";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.css";

import backgroundMundi from "./continentes/mundi.png";
import backgroundAmerica from "./continentes/america.png";
import backgroundAsia from "./continentes/asia.png";
import backgroundAfrica from "./continentes/africa.png";
import backgroundEuropa from "./continentes/europa.png";
import backgroundOceania from "./continentes/oceania.png";

function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const [searchString, setSearchString] = useState("");
  const [searchError, setSearchError] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(backgroundMundi);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState("todos");
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const [sortBy, setSortBy] = useState("az");
  const [sortedCountries, setSortedCountries] = useState(allCountries);
  
  async function handleChange(e) {
    const newSearchString = e.target.value;
    setSearchString(newSearchString);
  
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
  
    const newSearchTimeout = setTimeout(async () => {
      try {
        setSearchError(null);
  
        if (newSearchString === "") {
          setFilteredCountries(allCountries); // Restablecer la lista completa al borrar la búsqueda
        } else {
          const results = await dispatch(getCountriesByName(newSearchString));
  
          if (results.payload[0].message) {
            setSearchError(results.payload[0].message);
          } else {
            setSearchError(null);
            setFilteredCountries(results.payload); // Actualizar la lista filtrada
          }
        }
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        setSearchError("Se produjo un error al realizar la búsqueda.");
      }
    }, 500);
  
    setSearchTimeout(newSearchTimeout);
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    // Filtrar los países según el continente seleccionado
    const filtered = allCountries.filter((country) => {
      if (filtroSeleccionado === "todos") {
        return true;
      }
      return country.continent === filtroSeleccionado;
    });

    // Aplicar el ordenamiento
    const sorted = [...filtered];

    if (sortBy === "az") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "za") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredCountries(filtered);
    setSortedCountries(sorted);

    // Actualizar la imagen de fondo
    if (filtroSeleccionado === "todos") {
      setBackgroundImage(backgroundMundi);
    } else if (filtroSeleccionado === "Americas") {
      setBackgroundImage(backgroundAmerica);
    } else if (filtroSeleccionado === "Africa") {
      setBackgroundImage(backgroundAfrica);
    } else if (filtroSeleccionado === "Asia") {
      setBackgroundImage(backgroundAsia);
    } else if (filtroSeleccionado === "Europe") {
      setBackgroundImage(backgroundEuropa);
    } else if (filtroSeleccionado === "Oceania") {
      setBackgroundImage(backgroundOceania);
    }
    // Agrega condiciones adicionales según sea necesario para otros filtros
  }, [filtroSeleccionado, allCountries, sortBy]);

  return (
    <div
      className="home home-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <p className="text-home">WORLD-COUNTRIES</p>
      <SearchBar handleChange={handleChange} />
      <div className="filter-container">
        <label htmlFor="continent-filter">Filtrar por continente:</label>
        <select
          id="continent-filter"
          value={filtroSeleccionado}
          onChange={(e) => setFiltroSeleccionado(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="Americas">América</option>
          <option value="Africa">África</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
          {/* Agrega más opciones para otros continentes si es necesario */}
        </select>
      </div>
      <div className="sort-container">
        <label htmlFor="sort-filter">Ordenar por:</label>
        <select
          id="sort-filter"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
      {searchError ? (
        <p>{searchError}</p>
      ) : filteredCountries.length > 0 ? (
        <Cards allCountries={sortedCountries} /> // Mostrar los países ordenados
      ) : (
        <p>No se encontraron países.</p>
      )}
    </div>
  );
}

export default Home;
