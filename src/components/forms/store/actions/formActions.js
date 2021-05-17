import axios from '../../../../configs/axiosConfig';

export const GET_FORMS = 'GET FORMS';

export const getForms = () => {
    const request = axios.post('/form/get-forms');

    return dispatch =>
        request.then(response => {
            return dispatch({
                type: GET_FORMS,
                payload: response.data.data
            });
        });
}