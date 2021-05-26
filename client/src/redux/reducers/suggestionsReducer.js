import { SUGGES_TYPES } from '../actions/suggestionsAction'

const initialState = {
    loading: false,
    users: []
}

const suggestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUGGES_TYPES.LOADING_SUGGES:
            return {
                ...state,
                loading: action.payload
            }
        case SUGGES_TYPES.GET_USERS_SUGGES:
            return {
                ...state,
                users: action.payload.users
            }
        default:
            return state
    }
}

export default suggestionsReducer