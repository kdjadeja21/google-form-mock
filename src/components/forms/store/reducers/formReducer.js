import * as Actions from '../actions';

const initialState = {
    formsData: []
};

const formsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_FORMS: {
            return {
                ...state,
                formsData: action.payload
            };
        }
        default: {
            return state;
        }
    }
};

export default formsReducer;