import { GET_AUTH_TOKEN } from './authActionsTypes';

export const getAuthTokenMutation = (data: string) => {
    return {
        type: GET_AUTH_TOKEN,
        payload: data
    }
};