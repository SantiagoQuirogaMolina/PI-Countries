import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesByName, getCountries } from "../../Redux/action";
import Cards from "../../components/cards/cards";

import Navbar from "../../components/navbar/navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.css";

// Importar las imágenes de fondo para cada continente
import backgroundMundi from "./continentes/mundi.png";
import backgroundAmerica from "./continentes/america.png";
import backgroundAsia from "./continentes/asia.png";
import backgroundAfrica from "./continentes/africa.png";
import backgroundEuropa from "./continentes/europa.png";
import backgroundOceania from "./continentes/oceania.png";

function Home() {
  const dispatch = useDispatch();

  // Inicializar los estados de los filtros y la cadena de búsqueda desde el almacenamiento local si están disponibles
  const storedFiltroSeleccionado =
    localStorage.getItem("filtroSeleccionado") || "todos";
  const storedActivityFilter = localStorage.getItem("activityFilter") || "";
  const storedSortBy = localStorage.getItem("sortBy") || "az";
  const busqueda = localStorage.getItem("searchString") || "";
  console.log(busqueda)
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(
    storedFiltroSeleccionado
  );
  const [activityFilter, setActivityFilter] = useState(storedActivityFilter);
  const [sortBy, setSortBy] = useState(storedSortBy);
  const [searchString, setSearchString] = useState(busqueda);

  useEffect(() => {
    // Llamar a la acción para obtener todos los países al cargar el componente
    dispatch(getCountries());
  }, [dispatch]);

  // Obtener todos los países desde el estado global
  const allCountries = useSelector((state) => state.allCountries);

  // Estado para gestionar errores de búsqueda
  const [searchError, setSearchError] = useState(null);
  // Estado para manejar el tiempo de espera antes de realizar la búsqueda
  const [searchTimeout, setSearchTimeout] = useState(null);
  // Estado para gestionar la imagen de fondo
  const [backgroundImage, setBackgroundImage] = useState(backgroundMundi);
  // Estado para almacenar los países filtrados
  const [filteredCountries, setFilteredCountries] = useState([]);
  // Estado para almacenar los países ordenados
  const [sortedCountries, setSortedCountries] = useState([]);
  // Estado para almacenar las actividades disponibles
  const [availableActivities, setAvailableActivities] = useState([]);

  // Función para manejar cambios en la barra de búsqueda
  async function handleChange(e) {
    console.log(searchString + "---localStore");
    console.log(e.target.value + "---evento");

    const newSearchString = e.target.value.trim();
    setSearchString(newSearchString);
    localStorage.setItem("searchString", newSearchString); // Guardar en localStorage

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    // Establecer un tiempo de espera antes de realizar la búsqueda
    const newSearchTimeout = setTimeout(async () => {
      try {
        setSearchError(null);

        if (newSearchString === "") {
          // Restablecer la lista completa al borrar la búsqueda
          setFilteredCountries(allCountries);
        } else {
          // Realizar la búsqueda por nombre
          const results = await dispatch(getCountriesByName(newSearchString));
          if (results.payload[0].message) {
            setSearchError(results.payload[0].message);
          } else {
            setSearchError(null);
            // Actualizar la lista filtrada con los resultados
            setFilteredCountries(results.payload);
          }
        }
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        setSearchError("Se produjo un error al realizar la búsqueda.");
      }
    }, 500); // Tiempo de espera de 500 ms antes de ejecutar la búsqueda
    setSearchTimeout(newSearchTimeout);
  }

  // Función para ordenar alfabéticamente (A-Z o Z-A)
  function sortAlphabetically(data, sortOrder) {
    const sorted = [...data];
    if (sortOrder === "az") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "za") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sorted;
  }

  // Función para ordenar por población (ascendente o descendente)
  function sortByPopulation(data, sortOrder) {
    const sorted = [...data];
    if (sortOrder === "population-asc") {
      sorted.sort((a, b) => a.population - b.population);
    } else if (sortOrder === "population-desc") {
      sorted.sort((a, b) => b.population - a.population);
    }
    return sorted;
  }

  useEffect(() => {
    const filtered = allCountries.filter((country) => {
      if (filtroSeleccionado === "todos") {
        return true;
      }
      return country.continent === filtroSeleccionado;
    });

    const filteredByActivity = filtered.filter((country) => {
      if (activityFilter === "") {
        return true;
      }
      if (country.activities) {
        return country.activities.some((activity) =>
          activity.name.toLowerCase().includes(activityFilter.toLowerCase())
        );
      }
    });
    // Aplicar ordenamiento alfabético
    let sortedData = [...filteredByActivity];
    if (sortBy === "az" || sortBy === "za") {
      sortedData = sortAlphabetically(filteredByActivity, sortBy);
    } else if (sortBy === "population-asc" || sortBy === "population-desc") {
      sortedData = sortByPopulation(filteredByActivity, sortBy);
    }

    setFilteredCountries(filteredByActivity);
    setSortedCountries(sortedData);

    // Actualizar la imagen de fondo según el continente seleccionado
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
  }, [filtroSeleccionado, allCountries, sortBy, activityFilter]);

  useEffect(() => {
    // Obtener las actividades disponibles
    const activities = [];
    allCountries.forEach((country) => {
      if (country.activities) {
        country.activities.forEach((activity) => {
          if (!activities.includes(activity.name)) {
            activities.push(activity.name);
          }
        });
      }
    });
    setAvailableActivities(activities);
  }, [allCountries]);

  // Actualizar el almacenamiento local cuando cambien los estados de los filtros
  useEffect(() => {
    localStorage.setItem("filtroSeleccionado", filtroSeleccionado);
    localStorage.setItem("activityFilter", activityFilter);
    localStorage.setItem("sortBy", sortBy);
  }, [filtroSeleccionado, activityFilter, sortBy]);

  return (
    <div
      className="home home-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <p className="text-home">WORLD-COUNTRIES</p>
      <SearchBar handleChange={handleChange} value={searchString} />
      <div className="filtros">
        {/* Filtro de continente */}
        <div className="filter-container filtro-continente">
          <label htmlFor="continent-filter" className="textLabel">
            Filtrar por continente:
          </label>
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
          </select>
        </div>

        {/* Filtro de actividad */}
        <div className="activity-filter-container">
          <label htmlFor="activity-filter" className="textLabel">
            Por actividad:
          </label>
          <select
            id="activity-filter"
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
          >
            <option value="">Todas</option>
            {availableActivities.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de ordenamiento alfabético */}
        <div className="sort-container">
          <label htmlFor="sort-filter" className="textLabel">
            Por Nombre:
          </label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>

        {/* Filtro de ordenamiento por población */}
        <div className="sort-container">
          <label htmlFor="population-sort-filter" className="textLabel">
            Por Población:
          </label>
          <select
            id="population-sort-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="population-asc">Menor a Mayor</option>
            <option value="population-desc">Mayor a Menor</option>
          </select>
        </div>
      </div>

      {/* Renderizar el componente Navbar */}
      <div>{<Navbar />}</div>

      {/* Manejo de resultados y errores */}
      {searchError ? (
        <p>{searchError}</p>
      ) : sortedCountries.length > 0 ? (
        <Cards allCountries={sortedCountries} />
      ) : (
        <p>No se encontraron países.</p>
      )}
    </div>
  );
}

export default Home;
