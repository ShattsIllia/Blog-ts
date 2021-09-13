
import { IUser } from './mutations';
import { userActionsTypes } from './userActionsTypes';

interface UserAction {
    type: userActionsTypes.ADD_USER | userActionsTypes.DELETE_USER;
    payload?: IUser;
} 

const initialState: {user: IUser | {}} = {
    user: {},
}

const userReducer = (state = initialState, action: UserAction) => {
    // console.log("user Actions ", action)
    switch (action.type) {
        case userActionsTypes.ADD_USER:
            return {
                ...state,
                user: action.payload,
            }
      
        case userActionsTypes.DELETE_USER:
            return{
                ...state,
                user: null
            }

        default:
            return {
                ...state
            }
    }
}

export default userReducer;