const initialState = {
  allCountries: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        allCountries: action.payload,
      };
    case "GET_COUNTRIES_BY_NAME":
      return {
        ...state,
        allCountries: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
