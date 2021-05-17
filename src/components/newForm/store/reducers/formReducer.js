import * as Actions from '../actions';

const initialState = {
    form_name: "",
    form_slug: "",
    fields: [],
    fieldDialog: {
        type: 'new',
        open: false,
        data: null
    },
};

const formsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_FORM: {
            return {
                ...state,
                form_id: action.payload.id,
                form_name: action.payload.name,
                form_slug: action.payload.slug,
                fields: action.payload.form_fields
            };
        }
        case Actions.OPEN_FIELD_DIALOG: {
            return {
                ...state,
                fieldDialog: {
                    type: 'new',
                    open: true,
                    data: null
                }
            };
        }
        case Actions.CLOSE_FIELD_DIALOG: {
            return {
                ...state,
                fieldDialog: {
                    type: 'new',
                    open: false,
                    data: null
                }
            };
        }
        default: {
            return state;
        }
    }
};

export default formsReducer;