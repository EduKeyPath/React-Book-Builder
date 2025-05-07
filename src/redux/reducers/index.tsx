import { combineReducers } from 'redux';
import {createBookReducer} from './createBookRuducer';
import {cartReducer} from './cartReducer';
import {keyRuducer} from './keyRuducer';

export const reducer = combineReducers({
    createBookReducer,
    cartReducer,
    keyRuducer
})