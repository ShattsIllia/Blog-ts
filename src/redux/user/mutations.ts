
import {userActionsTypes} from './userActionsTypes'

export interface IUser{
    dateCreated: string;
    email: string;
    name: string;
    __v: number;
    _id: string;
}
export const addUser = (data: IUser) => {
    return {
        type: userActionsTypes.ADD_USER,
        payload: data
    }
};
export const deleteUser = (data: IUser) => {
    return {
        type: userActionsTypes.DELETE_USER,
        payload: data
    }
};

