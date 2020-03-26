import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
//rest

const initState = {};
const middleware = [thunk];
