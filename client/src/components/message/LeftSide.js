import React, { useState, useEffect, useRef } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { useHistory, useParams } from 'react-router-dom'
import { getConversations, MESSAGE_TYPES } from '../../redux/actions/messageAction'
import { ITEM_PER_PAGE } from '../../utils/config'

const LeftSide = () => {
	const { auth, message, online } = useSelector(state => state)
	const dispatch = useDispatch()
	const history = useHistory()
	const { id } = useParams()
	const [search, setSearch] = useState('')
	const [searchUsers, setSearchUsers] = useState([])
	const pageEnd = useRef()
	const [page, setPage] = useState(0)

	const handleSearch = async e => {
		e.preventDefault()
		if (!search) return setSearchUsers([]);
		try {
			const res = await getDataAPI(`search?username=${search}`, auth.token)
			setSearchUsers(res.data.users)
		} catch (err) {
			dispatch({
				type: GLOBAL_TYPES.ALERT,
				payload: { error: err.response.data.msg }
			})
		}
	}

	const handleAddUser = user => {
		setSearch('')
		setSearchUsers([])
		dispatch({ type: MESSAGE_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } })
		dispatch({ type: MESSAGE_TYPES.CHECK_ONLINE_OFFLINE, payload: online })
		return history.push(`/message/${user._id}`)
	}

	const isActive = user => {
		if (id === user._id) return 'active';
		return '';
	}

	useEffect(() => {
		if (message.firstLoad) return;
		const loadConversation = async () => {
			dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
			await dispatch(getConversations({ auth }))
			dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
		}
		loadConversation()

	}, [dispatch, auth, message.firstLoad])

	// Load More
	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setPage(p => p + 1)
			}
		}, {
			threshold: 0.1
		})

		observer.observe(pageEnd.current)
	}, [setPage])

	useEffect(() => {
		if (message.resultUsers >= (page - 1) * ITEM_PER_PAGE && page > 1) {
			dispatch(getConversations({ auth, page }))
		}
	}, [message.resultUsers, page, auth, dispatch])

	// Check User Online - Offline
	useEffect(() => {
		if (message.firstLoad) {
			dispatch({ type: MESSAGE_TYPES.CHECK_ONLINE_OFFLINE, payload: online })
		}
	}, [online, message.firstLoad, dispatch])

	return (
		<>
			<form className="message__header" onSubmit={handleSearch}>
				<input
					type="text"
					value={search}
					placeholder="Enter to Search..."
					onChange={e => setSearch(e.target.value)}
				/>
				<button style={{ display: 'none' }} type="submit">Search</button>
			</form>
			<div className="message__chatList">
				{
					searchUsers.length !== 0
						? <>
							{
								searchUsers.map(user => (
									<div key={user._id} className={`message-user ${isActive(user)}`}
										onClick={() => handleAddUser(user)}>
										<UserCard user={user} />
									</div>
								))
							}
						</>
						: <>
							{
								message.users.map(user => (
									<div key={user._id} className={`message-user ${isActive(user)}`}
										onClick={() => handleAddUser(user)}>
										<UserCard user={user} msg={true}>
											{
												user.online
													? <i className="fas fa-circle text-success" />
													: auth.user.following.find(item =>
														item._id === user._id
													) && <i className="fas fa-circle" />
											}

										</UserCard>
									</div>
								))
							}
						</>
				}
				<button ref={pageEnd} style={{ opacity: 0 }}>Load More</button>
			</div>
		</>
	)
}

export default LeftSide