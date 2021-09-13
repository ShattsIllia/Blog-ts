import {GET_AUTH_TOKEN} from './authActionsTypes';

const initialState = {
    token: '',
}

interface IAction {
    payload: string;
    type: string;
}

const authReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case GET_AUTH_TOKEN:
            return {
                ...state,
                token: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}

export default authReducer;