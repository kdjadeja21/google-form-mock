import axios from '../../../../configs/axiosConfig';
import { history } from '../../../../index';

export const SAVE_FORM = 'SAVE FORM';
export const GET_FORM = 'GET FORM';
export const SAVE_RESPONSE = 'SAVE RESPONSE';
export const OPEN_FIELD_DIALOG = 'OPEN FIELD DIALOG';
export const CLOSE_FIELD_DIALOG = 'CLOSE FIELD DIALOG';

export const saveForm = (params) => {
    const request = axios.post('/form/save-form', params);

    return dispatch =>
        request.then(response => {
            if (response.data.code === 200) {
                history.push('/')
                return dispatch({
                    type: SAVE_FORM,
                    payload: response.data.data
                });
            }
        });
}

export const getForm = (params) => {
    params = params.formId ? { slug: params.formId } : {}
    const request = axios.post('/form/get-form', params);

    return dispatch =>
        request.then(response => {
            return dispatch({
                type: GET_FORM,
                payload: response.data.data
            });
        });
}

export const saveResponse = (params) => {
    const request = axios.post('/form/save-response', params);

    return dispatch =>
        request.then(response => {
            if (response.data.code === 200) {
                history.push("/")
                return dispatch({
                    type: SAVE_RESPONSE,
                    payload: response.data.data
                });
            }
        });
}

export const openFieldDialog = () => {
    return dispatch => {
        dispatch({
            type: OPEN_FIELD_DIALOG
        })
    }
}

export const closeFieldDialog = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_FIELD_DIALOG
        })
    }
}