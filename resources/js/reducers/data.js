import { combineReducers } from 'redux';
import { HAVE_ERROR, FETCH_DATA } from '../actions/postsActions';

export function posts(state = [], action) {
    switch (action.type) {
        case FETCH_DATA:
            return action.data;
        
        case HAVE_ERROR:
            return action.hasError;
        
        default:
            return state;
    }
}

export default combineReducers({
    posts
});