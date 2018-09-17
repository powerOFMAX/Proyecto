import axios from 'axios'
 
export const FETCH_CONTENT = 'FETCH_CONTENT';
export const CONTENT_ERROR = 'CONTENT_ERROR';
export const CONTENT_SUCCESS = 'CONTENT_SUCCESS';

//export function showPosts() {
 //   return (dispatch, getState) => {
 //       axios.get('http://127.0.0.1:8000/api/posts/')
 //           .then((response) => {
   //             dispatch( { type: SHOW_POSTS, payload: response.data } ) 
  //          }) 
  //  };
//}

export function fetchContent(url) {
    return (dispatch) => {
        axios.get(url)
            .then((response) => dispatch(contentSuccess(response.data)))
            .catch(() => dispatch(contentError()));
    };
}

export function contentError() {
    return {
        type: CONTENT_ERROR,
        contentERROR: TRUE
    };
}

export function contentSuccess(content) {
    return {
        type: FETCH_CONTENT,
        content
    };
}