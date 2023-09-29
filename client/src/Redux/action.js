import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";

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
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error.message);
  }
};
export const getCountriesByName = (name) => {
  try {
    const endpoint = `http://localhost:3001/countries/name/${name}`;
    return async (dispatch) => {
      const country = await axios(endpoint);
      console.log(country.data);
      return dispatch({
        type: "GET_COUNTRIES_BY_NAME",
        payload: country.data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};
