import { POSTS_ARE_LOADING, POSTS_HAVE_ERROR, POSTS_FETCH_DATA_SUCCESS } from '../actions';

export function postsHaveError(state = false, action) {
    switch (action.type) {
        case POSTS_HAVE_ERROR:
            return action.hasError;

        default:
            return state;
    }
}

export function postsAreLoading(state = false, action) {
    switch (action.type) {
        case POSTS_ARE_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function posts(state = [], action) {
    switch (action.type) {
        case POSTS_FETCH_DATA_SUCCESS:
            return action.posts;
            
        default:
            return state;
    }
}