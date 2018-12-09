import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const GET_POST = 'editor/GET_POST';
const REMOVE_POST = 'editor/REMOVE_POST';

// action creators
export const getPost = createAction(GET_POST, api.getPost);
export const removePost = createAction(REMOVE_POST, api.removePost);

// initial state
const initialState = Map({
    post: Map({})
});

// reducer
export default handleActions({
    ...pender({
        type: GET_POST,
        onSuccess: (state, action) => {
            const { data: post } = action.payload;
            return state.set('post', fromJS(post)); 
        }
    })
}, initialState);