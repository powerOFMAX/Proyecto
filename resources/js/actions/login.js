import axios from 'axios';

export function login(url, data){
    return (dispatch) => {
        axios.post(url, data)
        .then((response) => this.context.router.push('/')
        );
    }
}