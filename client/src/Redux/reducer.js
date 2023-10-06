const initialState = {
  allCountries: [],
  getCountriesById: null,
  activities: [],
  activityCountryAssignments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ACTIVITY":
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };

    case "ASSIGN_ACTIVITY_TO_COUNTRY":
      return {
        ...state,
        activityCountryAssignments: [
          ...state.activityCountryAssignments,
          action.payload,
        ],
      };
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
    case "GET_COUNTRIES_BY_ID":
      return {
        ...state,
        getCountriesById: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
