import { GLOBAL_TYPES } from '../actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'

export const SUGGES_TYPES = {
    LOADING_SUGGES: 'LOADING_SUGGES',
    GET_USERS_SUGGES: 'GET_USERS_SUGGES'
}

export const getSuggestions = token => async dispatch => {
    try {
        dispatch({ type: SUGGES_TYPES.LOADING_SUGGES, payload: true })
        const res = await getDataAPI('suggestionsUser', token)
        dispatch({ type: SUGGES_TYPES.GET_USERS_SUGGES, payload: res.data })
        dispatch({ type: SUGGES_TYPES.LOADING_SUGGES, payload: false })
    } catch (err) {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}