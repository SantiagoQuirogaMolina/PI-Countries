import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesByName, getCountries } from "../../Redux/action";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.css";
function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

  const [searchString, setSearchString] = useState("");
  const [searchError, setSearchError] = useState(null); // Estado para manejar errores

  // Agrega un estado para el temporizador
  const [searchTimeout, setSearchTimeout] = useState(null);

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

  return (
    <div className="home ">
      <p className="text-home">WORLD-COUNTRIES</p>
      <SearchBar handleChange={handleChange} />
      <Navbar handleChange={handleChange} />
      {searchError ? (
        <p>{searchError}</p>
      ) : (
        allCountries.length > 0 ? (
          <Cards allCountries={allCountries} />
        ) : (
          <p>No se encontraron países.</p>
        )
      )}
    </div>
  );
}

export default Home;
