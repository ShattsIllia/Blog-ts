import { combineReducers } from "redux";

import authReducer from "../redux/auth/authReducer";
import postsReducer from "./posts/postsReducer";
import userReducer from "./user/userReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    post: postsReducer,
    user: userReducer,
});