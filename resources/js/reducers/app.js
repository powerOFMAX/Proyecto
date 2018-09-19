import { APP_ERROR, APP_FETCH, APP_SUCCESS } from '../actions/app';

export  function app(state = {
            content: [],
            content_error: false,
            content_success: false, 
            content_fetch: false
                                }, action) {
    switch (action.type) {
        case APP_FETCH:
            return {
                ...state,
                content: [],
                content_error: false,
                content_success: false,
                content_fetch: true,
               
            }

        case APP_SUCCESS:
        return {
            ...state,
            content: action.content,
            content_error: false,
            content_success: true,
            content_fetch: false,
        }

        case APP_ERROR:
            return {
                ...state,
                content_error: true,
                content_success: false,
                content_fetch: false,
            }

        default:
            return state;
    }
}
