import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_FETCH = 'LOGIN_FETCH';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR'; 

export function login(url, data){
    return async (dispatch) => {
        try {
            dispatch(loginLoad())
            const response = await axios.post(url, data);
            dispatch(loginSuccess(response.data));
        } catch (error) {
            dispatch(loginError());
        }
    };
}

export function me(url){
    return async (dispatch) => {
        try {
            const response = await axios.post(url);
            dispatch(loginSuccess(response.data));
        } catch (error) {
            dispatch(logoutSuccess());
        }
    }
}

export function logout(url){
    return async (dispatch) => {
        try {
            await axios.post(url);
            dispatch(logoutSuccess());
        } catch (error) {
            dispatch(logoutError())
        }
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