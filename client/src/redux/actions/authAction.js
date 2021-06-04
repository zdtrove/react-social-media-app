import { GLOBAL_TYPES } from './globalTypes'
import { postDataAPI } from "../../utils/fetchData"
import valid from '../../utils/valid'
import { toast } from 'react-toastify'

export const login = data => async dispatch => {
    try {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('login', data)
        dispatch({
            type: GLOBAL_TYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        localStorage.setItem("firstLogin", true)
        toast.success(res.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const refreshToken = () => async dispatch => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
        try {
            const res = await postDataAPI('refresh_token')
            dispatch({
                type: GLOBAL_TYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })
            dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} })
        } catch (err) {
            toast.dark(err.response.data.msg, {
                position: toast.POSITION.TOP_LEFT
            })
            dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
        }
    }
}

export const register = data => async dispatch => {
    const check = valid(data)
    if (check.errLength > 0) {
        return dispatch({ type: GLOBAL_TYPES.ALERT, payload: check.errMsg })
    }
    try {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('register', data)
        dispatch({
            type: GLOBAL_TYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        localStorage.setItem("firstLogin", true)
        toast.success(res.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const logout = () => async dispatch => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout')
        window.location.href = "/"
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}