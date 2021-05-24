import { PROFILE_TYPES } from '../actions/profileAction'
import { EditData } from '../actions/globalTypes'

const initialState = {
	loading: false,
	ids: [],
	users: [],
	posts: []
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_TYPES.LOADING_PROFILE:
			return {
				...state,
				loading: action.payload
			}
		case PROFILE_TYPES.GET_PROFILE_USER:
			return {
				...state,
				users: [...state.users, action.payload.user]
			}
		case PROFILE_TYPES.FOLLOW:
			return {
				...state,
				users: EditData(state.users, action.payload._id, action.payload)
			}
		case PROFILE_TYPES.UNFOLLOW:
			return {
				...state,
				users: EditData(state.users, action.payload._id, action.payload)
			}
		case PROFILE_TYPES.GET_PROFILE_ID:
			return {
				...state,
				ids: [...state.ids, action.payload]
			}
		default:
			return state
	}
}

export default profileReducer