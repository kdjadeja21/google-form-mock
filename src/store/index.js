import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import forms from '../components/forms/store/reducers';
import form from '../components/newForm/store/reducers';

const createReducer = asyncReducers =>
    combineReducers({
        forms,
        form,
        ...asyncReducers
    });

const enhancer = applyMiddleware(thunk);

const store = createStore(createReducer(), enhancer);

export default store;