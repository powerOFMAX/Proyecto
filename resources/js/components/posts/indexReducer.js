import { combineReducers } from 'redux';
import { posts, postsHaveError, postsAreLoading } from './actions';

export default combineReducers({
    posts,
    postsHaveError,
    postsAreLoading
});