import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";

// activities
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const ASSIGN_ACTIVITY_TO_COUNTRY = "ASSIGN_ACTIVITY_TO_COUNTRY";

export const deleteActivity = (activityId) => {
  return {
    type: "DELETE_ACTIVITY",
    payload: activityId,
  };
};
export const createActivity = (formDataToSend) => {

  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/activities",
        formDataToSend
      );
     
      dispatch({
        type: "CREATE_ACTIVITY",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al crear la actividad:", error);
    }
  };
};
export const getActivities = () => {

  try {
    const endpoint = "http://localhost:3001/activities";
    return async (dispatch) => {
      const { data } = await axios(endpoint);
     
      return dispatch({
        type: "GET_ACTIVITIES",
        payload: data,
      });
      
    };
    
  } catch (error) {
    console.log(error.message);
  }
};

export const assignActivityToCountry = (activityId, countryId) => ({
  type: "ASSIGN_ACTIVITY_TO_COUNTRY",
  payload: { activityId, countryId },
});

export const getCountries = () => {
  try {
    const endpoint = "http://localhost:3001/countries";
    return async (dispatch) => {
      const { data } = await axios(endpoint);
      return dispatch({
        type: "GET_COUNTRIES",
        payload: data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};
export const getCountriesByName = (name) => {
  try {
    const endpoint = `http://localhost:3001/countries/name/${name}`;
    return async (dispatch) => {
      const country = await axios(endpoint);

      return dispatch({
        type: "GET_COUNTRIES_BY_NAME",
        payload: country.data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const getCountriesById = (id) => {
  try {
    const endpoint = `http://localhost:3001/countries/${id}`;

    return async (dispatch) => {
      const country = await axios(endpoint);

      return dispatch({
        type: "GET_COUNTRIES_BY_ID",
        payload: country.data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};
