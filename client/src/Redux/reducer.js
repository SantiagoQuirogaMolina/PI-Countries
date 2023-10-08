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

    case "GET_COUNTRIES":
    case "GET_COUNTRIES_BY_NAME": // Manejar ambas acciones aquí
      return {
        ...state,
        allCountries: action.payload,
      };
    case "GET_COUNTRIES_BY_ID":
      return {
        ...state,
        getCountriesById: action.payload,
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    case "DELETE_ACTIVITY": {
      const activityIdToDelete = action.payload;
      const updatedActivities = state.activities.filter(
        (activity) => activity.id !== activityIdToDelete
      );

      return {
        ...state,
        activities: updatedActivities,
      };
    }

    default:
      return state;
  }
};

export default reducer;
