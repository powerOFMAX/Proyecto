import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_LOAD = 'LOGIN_LOAD';
export const LOGIN_OUT = 'LOGIN_OUT'; 
export const USER_LOGGED = 'USER_LOGGED';


export function login(url, data){
    return (dispatch) => {
        dispatch(loginLoad())
        axios.post(url, data)
        .then((response) => {
            dispatch(loginSuccess(response.data));
        }) 
        .catch(() => {
            dispatch(loginError());
        })
    };
}

export function logout(url){
    return (dispatch) => {
        axios.post(url)
            .then((response) => {
                dispatch( {
                    type: LOGIN_OUT,
                })
            })
    }
}

export function me(url){
    return(dispatch) => {
        axios.post(url)
            .then((response) => {
                dispatch( {
                    type: USER_LOGGED,
                    user: response.data
                })
            })
    }
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