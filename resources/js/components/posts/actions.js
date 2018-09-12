import axios from 'axios'
 
export const SHOW_POSTS = 'SHOW_POSTS';
export const POSTS_HAVE_ERROR = 'POSTS_HAVE_ERROR';
export const POSTS_ARE_LOADING = 'POSTS_ARE_LOADING';
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS';

//export function showPosts() {
 //   return (dispatch, getState) => {
 //       axios.get('http://127.0.0.1:8000/api/posts/')
 //           .then((response) => {
   //             dispatch( { type: SHOW_POSTS, payload: response.data } ) 
  //          }) 
  //  };
//}

export function postsFetchData(url) {
    return (dispatch) => {
        dispatch(postsAreLoading(true));

        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(postsAreLoading(false));

                return response;
            })
            .then((response) => dispatch(postsFetchDataSuccess(response.data)))
            .catch(() => dispatch(postsHaveError(true)));
    };
}

export function postsHaveError(bool) {
    return {
        type: POSTS_HAVE_ERROR,
        hasError: bool
    };
}
export function postsAreLoading(bool) {
    return {
        type: POSTS_ARE_LOADING,
        isLoading: bool
    };
}

export function postsFetchDataSuccess(posts) {
    return {
        type: POSTS_FETCH_DATA_SUCCESS,
        posts
    };
}