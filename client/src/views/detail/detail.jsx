import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesById } from "../../Redux/action";
import { useParams } from "react-router-dom";

function Detail() {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.getCountriesById); // Accede a getCountriesById
  const { id } = useParams();

  useEffect(() => {
    // Despacha la acción para obtener los detalles del país por su ID
    dispatch(getCountriesById(id));
  }, [dispatch, id]);

  // Verifica si country es nulo o undefined antes de mostrar los datos
  if (!country) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <div ></div>
      <div className="content">
        <h1>{country.name}</h1>
        <img src={country.flagImage} alt="imagen de la bandera" />
        <p><strong>País:</strong> {country.name}</p>
        <p><strong>Continente:</strong> {country.continent}</p>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Subregión:</strong> {country.subregion}</p>
        <p><strong>Área:</strong> {country.area} km²</p>
        <p><strong>Población:</strong> {country.population}</p>
        {/* Aquí puedes renderizar más información del país obtenida */}
      </div>
    </div>
  );
}

export default Detail;
