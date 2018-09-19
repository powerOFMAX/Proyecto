import { LOGIN_ERROR, LOGIN_LOAD, LOGIN_SUCCESS } from '../actions/login';

export function login ( state = {
        user: [],
        user_error: false,
        user_load: false,
        user_success: false,
        }, action)
    {
        switch (action.type) {
            case LOGIN_LOAD:
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
    
            default:
                return state;
        }
    }