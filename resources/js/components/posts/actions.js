import axios from 'axios'
 
export const SHOW_POSTS = 'SHOW_POSTS'
 
export function showPosts() {
    
    return (dispatch, getState) => {
        axios.get('http://127.0.0.1:8000/api/posts/')
            .then((response) => {
                dispatch( { type: SHOW_POSTS, payload: response.data } ) 
            }) 
    }

}