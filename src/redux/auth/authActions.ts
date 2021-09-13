import { Dispatch } from 'redux';
import axios from '../../API/axios';
import { getAuthTokenMutation } from './mutations';

export const getAuthToken = (email: string, password:string, {history}: any) => {
   return (dispatch: Dispatch) => {
    axios.post('/auth', {
        "email": email,
        "password": password,
    })
    .then(response => {
        localStorage.setItem('token', response.data.token)
        dispatch(getAuthTokenMutation(response.data.token))
    })
    .then(() => history.push('/'))
    .catch(error => {
        console.log('getAuthToken error: ', error.message);
    })
}
}