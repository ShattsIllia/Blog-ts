import { fetchFullPostMutation, fetchPostsMutation, } from './mutations';
import axios from '../../API/axios';
import { Dispatch } from 'redux';

export const fetchPosts = (skip: number) => {
    return (dispatch: Dispatch) => {
        axios.get(`/posts?limit=9&skip=${skip}`)
        .then(response => dispatch(fetchPostsMutation(response.data)))
        .catch(error => {
            console.log('Get all posts error: ', error.message);
        })
    }
};

export const fetchFullPost = (postId: string) => {
    return (dispatch: Dispatch) => {
        axios.get(`/posts/${postId}`)
        .then(response => dispatch(fetchFullPostMutation(response.data)))
        .catch(error => {
            console.log("Get Full posts error: ", error.message)
        })
    }
};

export const createNewPost = (title: string, text: string, description: string, {history}: any) => {
    return (dispatch: Dispatch) => {
        axios.post('/posts', {
        "title": title,
        "fullText": text,
        "description": description
        })
        .then(() => console.log('Post added successfully'))
        .then(() => history.push('/'))         
        .catch(error => {
            console.log("Create new post error: ", error.message)
        })
    }
};

export const updatePost = ( title: string, text: string, description: string, postId: string) => {
    return (dispatch: Dispatch) => {
        axios.patch(`/posts/${postId}`, {
        "title": title,
        "fullText": text,
        "description": description
        })
        .then(response => dispatch(fetchPostsMutation(response.data.data)))
        .catch(error => {
            console.log("Update post error: ", error.message)
        })
    }
};

export const getPostByTitle = (title:string) => {
    return (dispatch: Dispatch) => {
        axios.get(`/posts?limit=200&search=${title}`)
        .then(response => dispatch(fetchPostsMutation(response.data)))
        .catch(error => {
            console.log('Get post by title error: ', error.message);
        })
    }
};

export const deletePostById = (postId: string, {history}: any) => {
    return (dispatch: Dispatch) => {
        axios.delete(`/posts/${postId}`)
        .then(response => dispatch(fetchPostsMutation(response.data.data)))
        .then(() => history.push('/'))
        .catch(error => {
            console.log('Delete post error: ', error.message);
        })
    }
};
