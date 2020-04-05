import { SET_POSTS, SET_POST, LOADING_DATA, LOADING_UI, STOP_LOADING_UI, LIKE_POST, UNLIKE_POST, 
         DELETE_POST, SET_ERRORS, CLEAR_ERRORS, CREATE_POST, CREATE_COMMENT } from '../types';
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

export const getPost = postId => dispatch => {

    dispatch({ type: LOADING_UI });

    axios.get(`/post/${postId}`)
        .then(response => {
            dispatch({
                type: SET_POST,
                payload: response.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(e => console.log(e));
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

export const deletePost = postId => dispatch => {

    axios.delete(`/post/${postId}`)
        .then(() => {
            dispatch({ type: DELETE_POST, payload: postId });
        })
        .catch(e => console.log(e));
}

export const createPost = newPost => dispatch => {

    dispatch({ type: LOADING_UI });

    axios.post('/post', newPost)
        .then(response => {

            dispatch({
                type: CREATE_POST,
                payload: response.data
            });
            dispatch(clearErrors());
        })
        .catch(e => {
            dispatch({ 
                type: SET_ERRORS,
                payload: e.response.data 
            });
        });
}

export const createComment = (postId, commentData) => dispatch => {

    axios.post(`/post/${postId}/comment`, commentData)
        .then(response => {

            dispatch({
                type: CREATE_COMMENT,
                payload: response.data
            });
            dispatch(clearErrors());
        })
        .catch(e => {
            dispatch({
                type: SET_ERRORS,
                payload: e.response.data
            });
        });
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}


