import { combineReducers } from 'redux';
import form from './formReducer';

const questionReducers = combineReducers({
    form
});

export default questionReducers;