import axios from 'axios'
 
export const SHOW_POSTS = 'SHOW_POSTS';
export const HAVE_ERROR = 'HAVE_ERROR';
export const FETCH_DATA = 'FETCH_DATA';

//export function showPosts() {
 //   return (dispatch, getState) => {
 //       axios.get('http://127.0.0.1:8000/api/posts/')
 //           .then((response) => {
   //             dispatch( { type: SHOW_POSTS, payload: response.data } ) 
  //          }) 
  //  };
//}

export function fetchData(url) {
    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => dispatch(fetchDataSuccess(response.data)))
            .catch(() => dispatch(haveError(true)));
    };
}

export function haveError(bool) {
    return {
        type: HAVE_ERROR,
        hasError: bool
    };
}

export function fetchDataSuccess(data) {
    return {
        type: FETCH_DATA,
        data
    };
}