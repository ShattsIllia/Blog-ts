import { FETCH_POST_STATE } from './postActionsTypes';
import { FETCH_FULL_POST } from './postActionsTypes';
import { AnyAction } from 'redux';

export const fetchPostsMutation = (data: AnyAction) => {
    return {
        type: FETCH_POST_STATE,
        payload: data
    }
};
export const fetchFullPostMutation = (data: AnyAction) => {
    return{
        type: FETCH_FULL_POST,
        payload: data
    }
}
export const createNewPostMutation = (data: AnyAction) => {
    return{
        type: FETCH_FULL_POST,
        payload: data
    }
}