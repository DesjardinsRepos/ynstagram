import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from '../types';
import axios from 'axios';

export const getPosts = () => dispatch => {

    dispatch({ type: LOADING_DATA });

    axios.get('/posts')
        .then(response => {
            dispatch({
                type: SET_POSTS,
                payload: response.data
            });
        })
        .catch(e => {
            dispatch({
                type: SET_POSTS,
                payload: []
            });
        });
}

export const likePost = postId => dispatch => {
    axios.get(`/post/${postId}/like`)
        .then(response => {
            dispatch({
                type: LIKE_POST,
                payload: response.data
            });
        })
        .catch(e => console.log(e));
}

export const unlikePost = postId => dispatch => {
    axios.get(`/post/${postId}/unlike`)
        .then(response => {
            dispatch({
                type: UNLIKE_POST,
                payload: response.data
            });
        })
        .catch(e => console.log(e));
}