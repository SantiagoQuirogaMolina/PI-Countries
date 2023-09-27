import axios from 'axios';

export const GET_COUNTRIES ="GET_COUNTRIES"; 

export const getCountries = () => {
    try {
        const endpoint = 'http://localhost:3001/countries';
        return async (dispatch) => {
           const {data} =  await axios(endpoint)
                return dispatch({
                    type: 'GET_COUNTRIES',
                    payload: data,
                })
        }
    // eslint-disable-next-line no-unreachable
    } catch (error) {
        console.log(error.message);
    }
};
