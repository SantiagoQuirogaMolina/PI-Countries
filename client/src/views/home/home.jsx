import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesByName, getCountries } from "../../Redux/action";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.css";

import backgroundImage1 from "./continentes/mundi.png"; // Ruta a tu imagen de fondo 1
import backgroundImage2 from "./continentes/america.png"; // Ruta a tu imagen de fondo 2
import backgroundImage3 from "./continentes/asia.png"; // Ruta a tu imagen de fondo 3

function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

  const [searchString, setSearchString] = useState("");
  const [searchError, setSearchError] = useState(null);
  // Agrega un estado para el temporizador
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [backgroundImage, setBackgroundImage] = useState(backgroundImage1); // Estado para la imagen de fondo
  const [filtroSeleccionado, setFiltroSeleccionado] = useState("Filtro1"); // Cambia 'Filtro1' al filtro inicial

  async function handleChange(e) {
    const newSearchString = e.target.value;
    setSearchString(newSearchString);

    // Borra el temporizador anterior si existe
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Configura un nuevo temporizador para realizar la búsqueda después de un retraso
    const newSearchTimeout = setTimeout(async () => {
      try {
        setSearchError(null); // Borra cualquier error anterior

        if (newSearchString === "") {
          // Si la barra de búsqueda está vacía, obtén todos los países nuevamente
          dispatch(getCountries());
        } else {
          const results = await dispatch(getCountriesByName(newSearchString));

          if (results.payload[0].message) {
            setSearchError(results.payload[0].message);
          } else {
            setSearchError(null); // Borra el mensaje de error si se encontraron resultados
          }
        }
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        setSearchError("Se produjo un error al realizar la búsqueda.");
      }
    }, 500); // Puedes ajustar el tiempo de retraso según tus necesidades

    setSearchTimeout(newSearchTimeout);
  }
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    // Lógica para determinar qué imagen de fondo se debe mostrar según los filtros seleccionados
    if (filtroSeleccionado === "Filtro1") {
      setBackgroundImage(backgroundImage1);
    } else if (filtroSeleccionado === "Filtro2") {
      setBackgroundImage(backgroundImage2);
    } else if (filtroSeleccionado === "Filtro3") {
      setBackgroundImage(backgroundImage3);
    }
    // Agrega condiciones adicionales según sea necesario para otros filtros
  }, [filtroSeleccionado]);

  return (
    <div
      className="home home-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <p className="text-home">WORLD-COUNTRIES</p>
      <SearchBar handleChange={handleChange} />
      <Navbar handleChange={handleChange} />
      {searchError ? (
        <p>{searchError}</p>
      ) : allCountries.length > 0 ? (
        <Cards allCountries={allCountries} />
      ) : (
        <p>No se encontraron países.</p>
      )}
    </div>
  );
}

export default Home;
