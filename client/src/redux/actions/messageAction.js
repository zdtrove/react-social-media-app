import { DeleteData, GLOBAL_TYPES } from '../actions/globalTypes'
import { postDataAPI, getDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { ITEM_PER_PAGE } from '../../utils/config'
import { toast } from 'react-toastify'

export const MESSAGE_TYPES = {
	ADD_USER: 'ADD_USER',
	ADD_MESSAGE: 'ADD_MESSAGE',
	GET_CONVERSATIONS: 'GET_CONVERSATIONS',
	GET_MESSAGES: 'GET_MESSAGES',
	UPDATE_MESSAGES: 'UPDATE_MESSAGES',
	DELETE_MESSAGES: 'DELETE_MESSAGES',
	DELETE_CONVERSATION: 'DELETE_CONVERSATION',
	CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE'
}

export const addMessage = ({ msg, auth, socket }) => async dispatch => {
	dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg })
	const { _id, avatar, fullname, username } = auth.user
	socket.emit('addMessage', { ...msg, user: { _id, avatar, fullname, username } })
	try {
		await postDataAPI('message', msg, auth.token)
	} catch (err) {
		toast.dark(err.response.data.msg, {
			position: toast.POSITION.TOP_LEFT
		})
		dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
	}
}

export const getConversations = ({ auth, page = 1 }) => async dispatch => {
	try {
		const res = await getDataAPI(`conversations?limit=${page * ITEM_PER_PAGE}`, auth.token)
		let newArr = []
		res.data.conversations.forEach(item => {
			item.recipients.forEach(cv => {
				if (cv._id !== auth.user._id) {
					newArr.push({ ...cv, text: item.text, media: item.media, call: item.call })
				}
			})
		})
		dispatch({
			type: MESSAGE_TYPES.GET_CONVERSATIONS,
			payload: { newArr, result: res.data.result }
		})
	} catch (err) {
		toast.dark(err.response.data.msg, {
			position: toast.POSITION.TOP_LEFT
		})
		dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
	}
}

export const getMessages = ({ auth, id, page = 1 }) => async dispatch => {
	try {
		const res = await getDataAPI(`message/${id}?limit=${page * ITEM_PER_PAGE}`, auth.token)
		const newData = { ...res.data, messages: res.data.messages.reverse() }
		dispatch({ type: MESSAGE_TYPES.GET_MESSAGES, payload: { ...newData, _id: id, page } })
	} catch (err) {
		toast.dark(err.response.data.msg, {
			position: toast.POSITION.TOP_LEFT
		})
		dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
	}
}

export const loadMoreMessages = ({ auth, id, page = 1 }) => async dispatch => {
	try {
		const res = await getDataAPI(`message/${id}?limit=${page * ITEM_PER_PAGE}`, auth.token)
		const newData = { ...res.data, messages: res.data.messages.reverse() }
		dispatch({ type: MESSAGE_TYPES.UPDATE_MESSAGES, payload: { ...newData, _id: id, page } })
	} catch (err) {
		toast.dark(err.response.data.msg, {
			position: toast.POSITION.TOP_LEFT
		})
		dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
	}
}

export const deleteMessages = ({ msg, data, auth }) => async dispatch => {
	const newData = DeleteData(data, msg._id)
	dispatch({ type: MESSAGE_TYPES.DELETE_MESSAGES, payload: { newData, _id: msg.recipient } })
	try {
		await deleteDataAPI(`message/${msg._id}`, auth.token)
	} catch (err) {
		toast.dark(err.response.data.msg, {
			position: toast.POSITION.TOP_LEFT
		})
		dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
	}
}

export const deleteConversation = ({ auth, id }) => async dispatch => {
	dispatch({ type: MESSAGE_TYPES.DELETE_CONVERSATION, payload: id })
	try {
		await deleteDataAPI(`conversation/${id}`, auth.token)
	} catch (err) {
		toast.dark(err.response.data.msg, {
			position: toast.POSITION.TOP_LEFT
		})
		dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
	}
}