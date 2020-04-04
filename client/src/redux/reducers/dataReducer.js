import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA, DELETE_POST, CREATE_POST } from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

var index = null;

export default function(state = initialState, action) {
    switch(action.type) {

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }

        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }

        case LIKE_POST:
        case UNLIKE_POST:
            index = state.posts.findIndex((post) => post.postId === action.payload.postId); // unequal?
            state.posts[index] = action.payload;
            return { ...state };

        case DELETE_POST:
            index = state.posts.findIndex(post => post.postId === action.payload);
            state.posts.splice(index, 1);
            return {
                ...state
            }

        case CREATE_POST:
            return {
                ...state,
                posts: [
                    action.payload, // add new post to postarray
                    ...state.posts
                ]
            }

        default:
            return state;
    }

}