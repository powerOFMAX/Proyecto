import { SHOW_POSTS } from '../posts/actions';
 
const initialState = {
    list: []
}
 
export default function showPosts(state = initialState, action) {
    
    switch (action.type) {
        case SHOW_POSTS:
            return Object.assign({}, state, {list: action.payload})
        default:
            return state 
    }
    
}