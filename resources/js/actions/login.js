import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_LOAD = 'LOGIN_LOAD'; 


export function login(url, data){
    return (dispatch) => {
        dispatch(loginLoad())
        axios.post(url, data)
            .then((response) => {
                dispatch(loginSuccess(response.data));
                Promise.resolve();
            }) 
            .catch(() => {
                dispatch(loginError());
                Promise.reject();
            })
    };
}

function loginSuccess (user) {
    return {
        type: LOGIN_SUCCESS,
        user
    };
}

function loginError () {
    return {
        type: LOGIN_ERROR
    };
}

function loginLoad () {
    return {
        type: LOGIN_LOAD
    };
}