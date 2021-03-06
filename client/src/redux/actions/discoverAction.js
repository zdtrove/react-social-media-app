import { GLOBAL_TYPES } from './globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { toast } from 'react-toastify'

export const DISCOVER_TYPES = {
    LOADING_DISCOVER: 'LOADING_DISCOVER',
    GET_DISCOVER_POSTS: 'GET_DISCOVER_POSTS',
    UPDATE_POST: 'UPDATE_DISCOVER_POST'
}

export const getDiscoverPosts = token => async dispatch => {
    try {
        dispatch({ type: DISCOVER_TYPES.LOADING_DISCOVER, payload: true })
        const res = await getDataAPI(`post_discover`, token)
        dispatch({ type: DISCOVER_TYPES.GET_DISCOVER_POSTS, payload: res.data })
        dispatch({ type: DISCOVER_TYPES.LOADING_DISCOVER, payload: false })
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}