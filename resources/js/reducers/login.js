import { LOGIN_ERROR, LOGIN_FETCH, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_ERROR } from '../actions/login';

export function login ( state = {
        user: [],
        user_error: false,
        user_load: false,
        user_success: false,
        }, action)
    {
        switch (action.type) {
            case LOGIN_FETCH:
                return {
                    ...state,
                    user: [],
                    user_error: false,
                    user_success: false,
                    user_load: true,
                    
                }

            case LOGIN_SUCCESS:
                return {
                    ...state,
                    user: action.user,
                    user_error: false,
                    user_success: true,
                    user_load: false,
            }

            case LOGIN_ERROR:
                return {
                    ...state,
                    user_error: true,
                    user_success: false,
                    user_load: false,
                }

            case LOGOUT_SUCCESS:
                return {
                    ...state,
                    user: [],
                    user_error: false,
                    user_success: false,
                    user_load: false,
                }
            case LOGOUT_ERROR:
                return {
                    ...state,
                    user_error: true,
                    user_success: false,
                    user_load: false,
                }
            default:
                return state;
        }
    }

