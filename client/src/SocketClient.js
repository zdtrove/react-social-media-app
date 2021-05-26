import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POST_TYPES } from './redux/actions/postAction'

const SocketClient = () => {
	const { auth, socket } = useSelector(state => state)
	const dispatch = useDispatch()

	// joinUser
	useEffect(() => {
		socket.emit('joinUser', auth.user._id)
	}, [socket, auth.user._id])

	// Likes
	useEffect(() => {
		socket.on('likeToClient', newPost => {
			dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
		})
		return () => socket.off('likeToClient')
	}, [socket, dispatch])

	useEffect(() => {
		socket.on('unLikeToClient', newPost => {
			dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
		})
		return () => socket.off('unLikeToClient')
	}, [socket, dispatch])

	// Comments
	useEffect(() => {
		socket.on('createCommentToClient', newPost => {
			dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
		})
		return () => socket.off('createCommentToClient')
	}, [socket, dispatch])

	useEffect(() => {
		socket.on('deleteCommentToClient', newPost => {
			dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
		})
		return () => socket.off('deleteCommentToClient')
	}, [socket, dispatch])

	return <>

	</>
}

export default SocketClient