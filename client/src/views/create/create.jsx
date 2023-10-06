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
    if (
      formData.name.trim() === "" ||
      formData.difficulty === 0 ||
      formData.duration === 0 ||
      formData.season === "" ||
      formData.selectedCountries.length === 0
    ) {
      alert(
        "Por favor, complete todos los campos antes de enviar el formulario."
      );
      return false;
    }
    return true;
  };

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
