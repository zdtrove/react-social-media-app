import { DeleteData, EditData } from '../actions/globalTypes'
import { MESSAGE_TYPES } from '../actions/messageAction'

const initialState = {
	users: [],
	resultUsers: 0,
	data: [],
	firstLoad: false
}

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case MESSAGE_TYPES.ADD_USER:
			if (state.users.every(item => item._id !== action.payload._id)) {
				return {
					...state,
					users: [action.payload, ...state.users]
				}
			}
			return state
		case MESSAGE_TYPES.ADD_MESSAGE:
			return {
				...state,
				data: state.data.map(item =>
					item._id === action.payload.recipient || item._id === action.payload.sender
						? {
							...item,
							messages: [...item.messages, action.payload],
							result: item.result + 1
						}
						: item
				),
				users: state.users.map(user =>
					user._id === action.payload.recipient || user._id === action.payload.sender
						? { ...user, text: action.payload.text, media: action.payload.media }
						: user
				)
			}
		case MESSAGE_TYPES.GET_CONVERSATIONS:
			return {
				...state,
				users: action.payload.newArr,
				resultUsers: action.payload.result,
				firstLoad: true
			}
		case MESSAGE_TYPES.GET_MESSAGES:
			return {
				...state,
				data: [...state.data, action.payload]
			}
		case MESSAGE_TYPES.UPDATE_MESSAGES:
			return {
				...state,
				data: EditData(state.data, action.payload._id, action.payload)
			}
		case MESSAGE_TYPES.DELETE_MESSAGES:
			return {
				...state,
				data: state.data.map(item =>
					item._id === action.payload._id
						? { ...item, messages: action.payload.newData }
						: item
				)
			}
		case MESSAGE_TYPES.DELETE_CONVERSATION:
			return {
				...state,
				users: DeleteData(state.users, action.payload),
				data: DeleteData(state.data, action.payload)
			}
		case MESSAGE_TYPES.CHECK_ONLINE_OFFLINE:
			return {
				...state,
				users: state.users.map(user =>
					action.payload.includes(user._id)
						? { ...user, online: true }
						: { ...user, online: false }
				)
			}
		default:
			return state
	}
}

export default messageReducer