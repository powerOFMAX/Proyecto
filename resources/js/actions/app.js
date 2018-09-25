import axios from 'axios'
 
export const APP_ERROR = 'APP_ERROR';
export const APP_SUCCESS = 'APP_SUCCESS';
export const APP_FETCH = 'APP_FETCH';

//export function showPosts() {
 //   return (dispatch, getState) => {
 //       axios.get('http://127.0.0.1:8000/api/posts/')
 //           .then((response) => {
   //             dispatch( { type: SHOW_POSTS, payload: response.data } ) 
  //          }) 
  //  };
//} 

export function fetchContent(url) {
    return async (dispatch) => {
        try {
            dispatch(appFetch());
            const response = await axios.get(url);
            dispatch(appSuccess(response.data));   
        } catch (error) {
            dispatch(appError());
        }
    };
}

function appError() {
    return {
        type: APP_ERROR
    };
}

function appSuccess(content) {
    return {
        type: APP_SUCCESS,
        content
    };
}

function appFetch() {
    return {
        type: APP_FETCH
    };
}