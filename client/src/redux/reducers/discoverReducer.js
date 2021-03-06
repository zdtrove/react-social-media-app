import { ITEM_PER_PAGE } from "../../utils/config"
import { DISCOVER_TYPES } from "../actions/discoverAction"

const initialState = {
    loading: false,
    posts: [],
    result: ITEM_PER_PAGE,
    page: 2,
    firstLoad: false
}

const discoverReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISCOVER_TYPES.LOADING_DISCOVER:
            return {
                ...state,
                loading: action.payload
            }
        case DISCOVER_TYPES.GET_DISCOVER_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                firstLoad: true
            }
        case DISCOVER_TYPES.UPDATE_POST:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                page: state.page + 1
            }
        default:
            return state
    }
}

export default discoverReducer
