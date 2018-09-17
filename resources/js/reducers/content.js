import { combineReducers } from 'redux';
import { CONTENT_ERROR, FETCH_CONTENT } from '../actions/content';

export function content(state = [], action) {
    switch (action.type) {
        case FETCH_CONTENT:
            return action.content;
        
        case CONTENT_ERROR:
            return action.contentError;
        
        default:
            return state;
    }
}

export default combineReducers({
    content
});