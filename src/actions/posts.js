import * as api from '../api';
import { DELETE, CREATE, UPDATE, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT } from '../constants/actionTypes';

//Action Creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        // console.log('Check', data); 
        dispatch({
            type: FETCH_POST,
            payload: {
                post: data
            }
        });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);        
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({
            type: FETCH_ALL,
            payload: data
        });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);        
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPostsBySearch(searchQuery);
        console.log('data', data);
        dispatch({
            type: FETCH_BY_SEARCH,
            payload: data
        });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);        
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`);
        dispatch({
            type: CREATE,
            payload: data
        });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);

        dispatch({
            type: UPDATE,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        // console.log('   ', data)

        dispatch({
            type: DELETE,
            id: id
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({
            type: UPDATE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(value, id);
        // console.log(data);

        dispatch({
            type: COMMENT,
            payload: data
        });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
}