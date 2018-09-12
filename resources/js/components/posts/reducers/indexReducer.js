import { combineReducers } from 'redux';
import { posts, postsHaveError, postsAreLoading } from '../reducers/postsReducer';

export default combineReducers({
    posts,
    postsHaveError,
    postsAreLoading
});