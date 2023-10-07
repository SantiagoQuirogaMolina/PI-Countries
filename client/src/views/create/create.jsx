import "./create.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createActivity } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../Redux/action";
import { Link, NavLink } from "react-router-dom";


function TourForm() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [guardadoConExito, setGuardadoConExito] = useState(false);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  const allCountries = useSelector((state) => state.allCountries);

  const [formData, setFormData] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    selectedCountries: [],
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
    setFormData({
      ...formData,
      selectedCountries: selectedCountries,
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

  const validateForm = () => {
    const formErrors = {};

    if (formData.name.trim() === "") {
      formErrors.name = "El nombre es obligatorio";
    }

    if (formData.difficulty === 0) {
      formErrors.difficulty = "La dificultad es obligatoria";
    }

    if (formData.duration === 0) {
      formErrors.duration = "La duración es obligatoria";
    }

    if (formData.season === "") {
      formErrors.season = "La temporada es obligatoria";
    }

    if (formData.selectedCountries.length === 0) {
      formErrors.selectedCountries = "Debe seleccionar al menos un país";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleRemoveCountry = (countryId) => {
    const updatedSelectedCountries = formData.selectedCountries.filter(
      (id) => id !== countryId
    );
    setFormData({
      ...formData,
      selectedCountries: updatedSelectedCountries,
    });
  };

  const sortedCountries = [...allCountries].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSend = {
      ...formData,
      difficulty: parseInt(formData.difficulty, 10),
      duration: parseFloat(formData.duration),
      season: formData.season.join(", "),
    };
    try {
      await dispatch(createActivity(formDataToSend));
      setFormData({
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        selectedCountries: [],
      });
      setGuardadoConExito(true);
    } catch (error) {
      console.error("Error al crear la actividad:", error);
    }
  };

  return (
   
    <div className="tour-form-container">
          <NavLink to="/home">
        <button>Home</button>
      </NavLink>
      <NavLink to="/activities">
        <button> Actividades</button>
      </NavLink>
       <h2>Formulario de creacion de actividades</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label>
          Dificultad:
          <input
            type="number"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
          />
          {errors.difficulty && <p className="error">{errors.difficulty}</p>}
        </label>
        <label>
          Duración:
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
          />
          {errors.duration && <p className="error">{errors.duration}</p>}
        </label>

        <label>
          Temporada:
          <select
            name="season"
            value={formData.season}
            onChange={handleSeasonChange}
          >
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
          {errors.season && <p className="error">{errors.season}</p>}
        </label>
        <label>
          Países: (oprime ctrl y luego click)
          <select
            name="selectedCountries"
            multiple
            onChange={handleCountryChange}
          >
            {sortedCountries.map((country, index) => (
              <option key={index} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.selectedCountries && (
            <p className="error">{errors.selectedCountries}</p>
          )}
        </label>
        <div>
          <h3>Países seleccionados:</h3>
          <ul>
            {formData.selectedCountries.map((countryId) => {
              const country = allCountries.find((c) => c.id === countryId);
              return (
                <li key={countryId} onClick={() => handleRemoveCountry(countryId)}>
                  {country.name}
                </li>
              );
            })}
          </ul>
        </div>
        <button type="submit">Crear Actividad Turística</button>
      </form>
      {guardadoConExito && Object.keys(errors).length === 0 && (
        <p className="exito">Se guardó en la base de datos</p>
      )}
    </div>
  );
}

export default connect(null, { createActivity })(TourForm);
