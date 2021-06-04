import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData"
import { GLOBAL_TYPES } from "./globalTypes"
import { toast } from 'react-toastify'

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}

export const createNotify = ({ msg, auth, socket }) => async dispatch => {
    try {
        const res = await postDataAPI('notify', msg, auth.token)
        socket.emit('createNotify', {
            ...res.data.notify,
            user: {
                username: auth.user.username,
                avatar: auth.user.avatar
            }
        })
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const removeNotify = ({ msg, auth, socket }) => async dispatch => {
    try {
        await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token)
        socket.emit('removeNotify', msg)
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const getNotifies = token => async dispatch => {
    try {
        const res = await getDataAPI('notifies', token)
        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies })
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const isReadNotify = ({ msg, auth }) => async dispatch => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: { ...msg, isRead: true } })
    try {
        await patchDataAPI(`/isReadNotify/${msg._id}`, null, auth.token)
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const deleteAllNotifies = token => async dispatch => {
    dispatch({ type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: [] })
    try {
        await deleteDataAPI('deleteAllNotifies', token)
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}