import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createActivity } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../Redux/action";

function TourForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  const allCountries = useSelector((state) => state.allCountries); // Accede a la lista de países desde el estado global

  const [formData, setFormData] = useState({
    name: "",
    difficulty: 1,
    duration: 0,
    season: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountryChange = (e) => {
    const { options } = e.target;
    const selectedCountries = [];
    for (const option of options) {
      if (option.selected) {
        selectedCountries.push(option.value);
      }
    }
    // Aquí tienes el array de países seleccionados

    setFormData({
      ...formData,
      selectedCountries,
    });
  };

  const handleSeasonChange = (e) => {
    const { options } = e.target;
    const selectedSeasons = [];
    for (const option of options) {
      if (option.selected) {
        selectedSeasons.push(option.value);
      }
    }
    setFormData({
      ...formData,
      season: selectedSeasons,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un nuevo objeto con los valores modificados
    const formDataToSend = {
      ...formData,
      difficulty: parseInt(formData.difficulty, 10), // Convierte difficulty a número
      duration: parseFloat(formData.duration), // Convierte duration a número de punto flotante
      season: formData.season.join(", "), // Convierte season a una cadena
    };
    try {
      await dispatch(createActivity(formDataToSend));
      setFormData({
        name: "",
        difficulty: 1,
        duration: 1,
        season: [],
      });
    } catch (error) {
      console.error("Error al crear la actividad:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Dificultad:
        <input
          type="number"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Duración:
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Temporada:
        <select
          name="season"
          multiple
          value={formData.season}
          onChange={handleSeasonChange}
        >
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
          <option value="Invierno">Invierno</option>
          <option value="Primavera">Primavera</option>
        </select>
      </label>
      <label>
        Países:
        <select
          name="selectedCountries"
          multiple
          onChange={handleCountryChange}
        >
          {allCountries.map((country, index) => (
            <option key={index} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Crear Actividad Turística</button>
    </form>
  );
}

export default connect(null, { createActivity })(TourForm);
