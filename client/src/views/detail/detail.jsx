import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesById } from "../../Redux/action";
import { useParams } from "react-router-dom";
import "./detail.css";

// Importa los componentes necesarios de la librería google-maps-react
import { Map, GoogleApiWrapper } from "google-maps-react";

function Detail({ google }) {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.getCountriesById);
  const { id } = useParams();

  // Inicializa los estados con los valores correctos cuando 'country' esté disponible
  const initialPopulationCount = 0;
  const initialAreaCount = 0;

  // Estados para el conteo ascendente de población y área
  const [populationCount, setPopulationCount] = useState(
    initialPopulationCount
  );
  const [areaCount, setAreaCount] = useState(initialAreaCount);

  useEffect(() => {
    dispatch(getCountriesById(id));
    // Al desmontar el componente, reinicia los contadores
    return () => {
      setPopulationCount(0);
      setAreaCount(0);
    };
  }, [dispatch, id]);

  useEffect(() => {
    // Función para actualizar el conteo de población
    const updatePopulationCount = () => {
      if (country && populationCount < country.population) {
        // Calcular la velocidad de conteo en función del valor objetivo
        const targetValue = country.population;
        const remainingValue = targetValue - populationCount;
        const speed = Math.max(1, Math.floor(targetValue / 1000)); // Ajusta el divisor según la velocidad deseada

        // Incrementa el conteo en función de la velocidad
        const newValue = populationCount + speed;

        // Asegurarse de no exceder el valor objetivo
        const nextValue = Math.min(newValue, targetValue);

        // Actualiza el estado
        setPopulationCount(nextValue);
      }
    };

    const updateAreaCount = () => {
      if (country && country.area && areaCount < country.area) {
        // Calcular la velocidad de conteo en función del valor objetivo
        const targetValue = country.area;
        const remainingValue = targetValue - areaCount;
        const speed = Math.max(1, Math.floor(targetValue / 1000)); // Ajusta el divisor según la velocidad deseada

        // Incrementa el conteo en función de la velocidad
        const newValue = areaCount + speed;

        // Asegurarse de no exceder el valor objetivo
        const nextValue = Math.min(newValue, targetValue);

        // Actualiza el estado
        setAreaCount(nextValue);
      }
    };

    // Intervalo para actualizar el conteo de población cada 1000 milisegundos (1 segundo)
    const populationIntervalId = setInterval(updatePopulationCount, 1 / 9999);

    // Intervalo para actualizar el conteo de área cada 1000 milisegundos (1 segundo)
    const areaIntervalId = setInterval(updateAreaCount, 1 / 9999);

    // Limpia los intervalos cuando el componente se desmonta
    return () => {
      clearInterval(populationIntervalId);
      clearInterval(areaIntervalId);
    };
  }, [country, populationCount, areaCount]);

  if (!country) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }
  const populationStyle = populationCount > 1000000000 ? { color: "red" } : {};
  const textTops = populationCount > 1000000000 ? { visibility: "visible" } : {};
  return (
    <div>
      <div className="nombreYbandera">
        <h1>{country.name}</h1>
        <img
          className="bandera"
          src={country.flagImage}
          alt="imagen de la bandera"
        />
      </div>
      <div className="map-container">
        {/* Utiliza el componente Map de google-maps-react */}
        <Map
          google={google}
          initialCenter={{ lat: -1.28, lng: 36.82 }}
          zoom={4}
        >
          {/* Coloca un marcador en las coordenadas del país */}
        </Map>
      </div>
      <div className="content">
        <div className="gurpo">
          <p className="parrafo">
            <strong className="titulo">Continente:</strong> {country.continent}
          </p>
          <p className="parrafo">
            <strong className="titulo">Capital:</strong> {country.capital}
          </p>
          <p className="parrafo">
            <strong className="titulo">Subregión:</strong> {country.subregion}
          </p>
        </div>
        <div className="gurpo">
          <p className="parrafo">
            <strong className="titulo">Área:</strong> {areaCount} km²
          </p>
          <p className="parrafo" style={populationStyle}>
            <strong className="titulo" >
              Población:
            </strong>{" "}
           
            {populationCount}  <strong className="textTops" style={textTops}>
              Top <span>1</span>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

// Utiliza GoogleApiWrapper para conectar tu componente a la API de Google Maps
export default GoogleApiWrapper({
  apiKey: "AIzaSyD0KKYmfssWuLWEaEuv2qY_Rl7-DPiUvBU", // Reemplaza con tu propia clave de API
})(Detail);
