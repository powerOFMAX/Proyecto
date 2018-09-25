import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_FETCH = 'LOGIN_FETCH';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR'; 

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

export function me(url){
    return(dispatch) => {
        axios.post(url)
            .then((response) => {
                dispatch(loginSuccess(response.data))
            })
            .catch(() => {
                dispatch(logoutSuccess())
            })
    }
}

export function logout(url){
    return (dispatch) => {
        axios.post(url)
            .then((response) => {
                dispatch(logoutSuccess())
            })
            .catch(() => {
                dispatch(logoutError())
            })
    }
}

function logoutSuccess () {
    return {
        type: LOGOUT_SUCCESS
    };
}

function logoutError () {
    return {
        type: LOGOUT_ERROR
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
        type: LOGIN_FETCH
    };
}