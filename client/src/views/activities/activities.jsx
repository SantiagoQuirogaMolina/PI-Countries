import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, deleteActivity } from "../../Redux/action"; // Asegúrate de importar la acción correcta
import "./Activities.css"; // Asegúrate de ajustar la ruta a tu archivo CSS
import { Link, NavLink } from "react-router-dom";

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleDeleteActivity = (activityId) => {
    // Lógica para eliminar la actividad
    dispatch(deleteActivity(activityId));
  };

  return (
    <div>
      <NavLink to="/home">
        <button>Home</button>
      </NavLink>
      <NavLink to="/create">
        <button>Crear Actividad</button>
      </NavLink>
      <div className="activity-container">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-box">
            <h2 className="activity-title">{activity.name}</h2>
            <p className="activity-details">
              Difficulty: {activity.difficulty}
            </p>
            <p className="activity-details">Duration: {activity.duration}</p>
            <p className="activity-details">Season: {activity.season}</p>
            <ul className="country-list">
              {activity.countries.map((country) => (
                <li key={country.id} className="country-item">
                  <img
                    src={country.flagImage}
                    alt={`Flag of ${country.name}`}
                    className="country-flag"
                  />
                  <span className="country-name">{country.name}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleDeleteActivity(activity.id)} // Llama a la función de manejo de eliminación
              className="delete-button"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
