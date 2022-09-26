import axios from 'axios';
import { baseUrl } from '../api/baseUrl';
import {
    FETCH_STREAMS,
    FETCH_STREAM,
    CREATE_STREAM,
    UPDATE_STREAM,
    DELETE_STREAM,
    SIGN_IN,
    SIGN_OUT,
} from "./types";
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}
axios.defaults.withCredentials = true;
axios.defaults.origin = true;

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await axios.post(`${baseUrl}/streams`, { ...formValues, userId })
    dispatch({ type: CREATE_STREAM, payload: response.data })
    history.push('/');
}

export const fetchStreams = () => async dispatch => {
    const response = await axios.get(`${baseUrl}/streams`)
    dispatch({ type: FETCH_STREAMS, payload: response.data })
}

export const fetchStream = id => async dispatch => {
    const response = await axios.get(`${baseUrl}/streams/${id}`)
    dispatch({ type: FETCH_STREAM, payload: response.data })
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await axios.patch(`${baseUrl}/streams/${id}`, formValues)
    dispatch({ type: UPDATE_STREAM, payload: response.data })
    history.push('/');
}

export const deleteStream = id => async dispatch => {
    const response = await axios.delete(`${baseUrl}/streams/${id}`)
    dispatch({ type: DELETE_STREAM, payload: response.data })
    history.push('/');
}
