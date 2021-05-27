import { deleteDataAPI, getDataAPI, postDataAPI } from "../../utils/fetchData"
import { GLOBAL_TYPES } from "./globalTypes"

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES'
}

export const createNotify = ({ msg, auth, socket }) => async dispatch => {
    try {
        const res = await postDataAPI('notify', msg, auth.token)
        console.log(res)
    } catch (err) {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const removeNotify = ({ msg, auth, socket }) => async dispatch => {
    try {
        const res = await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token)
        console.log(res)
    } catch (err) {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getNotifies = token => async dispatch => {
    try {
        const res = await getDataAPI('notifies', token)
        console.log(res)
        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies })
    } catch (err) {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}