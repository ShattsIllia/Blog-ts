import { FETCH_POST_STATE } from './postActionsTypes';
import { FETCH_FULL_POST } from './postActionsTypes';
import { CREATE_NEW_POST } from './postActionsTypes';

interface IGetPost{
    data: [];
    Pagination: {};
}

interface IGetFullPost{
    dateCreated: string; 
    description: string; 
    fullText: string;
    likes: [];
    postedBy: null;
    title: string;
    __v: number;
    _id: string;
}

interface PostActions {
    type: string;
    payload?: IGetPost | IGetFullPost
}

interface IInitial {
    posts: any[];
    fullPost: any[];
}

const initialState:IInitial = {
    posts: [],
    fullPost: [],
}

const postsReducer = (state = initialState, action: PostActions) => {
    switch (action.type) {
        case FETCH_POST_STATE:
            return {
                ...state,
                posts: action.payload,
            }
        case FETCH_FULL_POST:
            return{
                ...state,
                fullPost: action.payload,
            }
        case CREATE_NEW_POST:
            return{
                ...state,
                posts: action.payload,
            }

        default:
            return {
                ...state
            }
    }
}

export default postsReducer;