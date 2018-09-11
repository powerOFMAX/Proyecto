import axios from 'axios'
 
export const SHOW_POSTS = 'SHOW_POSTS'
 
export function showPosts() {
    
    return (dispatch, getState) => {
        axios.get('http://jsonplaceholder.typicode.com/users')
            .then((response) => {
                dispatch( { type: SHOW_POSTS, payload: response.data } ) 
            }) 
    }

}