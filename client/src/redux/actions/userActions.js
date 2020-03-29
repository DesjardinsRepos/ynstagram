import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {

    dispatch({ type: LOADING_UI });

    axios.post('/signin', userData)
        .then(result => {

            localStorage.setItem('FBAuthToken', `Bearer ${result.data.token}`);
            axios.defaults.headers.common['Autorization'] = `Bearer ${result.data.token}`; // add token for every axios req in future
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });

            history.push('/'); //redirect to '/'
        })
        .catch(e => {
            dispatch({
                type: SET_ERRORS,
                payload: e.response.data
            })
        });
}

export const signupUser = (userData, history) => dispatch => {

    dispatch({ type: LOADING_UI });

    axios.post('/signup', userData)
        .then(result => {
                //setAuthHeader
            localStorage.setItem('FBAuthToken', `Bearer ${result.data.token}`);
            axios.defaults.headers.common['Autorization'] = `Bearer ${result.data.token}`; // add token for every axios req in future
            dispatch(getUserData());

            dispatch({ type: CLEAR_ERRORS });
            history.push('/'); //redirect to '/'
        })
        .catch(e => {
            dispatch({
                type: SET_ERRORS,
                payload: e.response.data
            })
        });
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('FBAuthToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => dispatch => {
    axios.get('/user')
        .then(result => {
            dispatch({
                type: SET_USER,
                payload: result.data
            })
        })
        .catch(e => console.log(e));
}