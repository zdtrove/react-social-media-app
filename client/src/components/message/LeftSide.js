import React, { useState, useEffect } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { useHistory, useParams } from 'react-router-dom'
import { addUser, getConversations } from '../../redux/actions/messageAction'

const LeftSide = () => {
	const { auth, message } = useSelector(state => state)
	const dispatch = useDispatch()
	const history = useHistory()
	const { id } = useParams()
	const [search, setSearch] = useState('')
	const [searchUsers, setSearchUsers] = useState([])

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
		dispatch(addUser({ user, message }))
		return history.push(`/message/${user._id}`)
	}

	const isActive = user => {
		if (id === user._id) return 'active';
		return '';
	}

	useEffect(() => {
		if (message.firstLoad) return;
		dispatch(getConversations({ auth }))
	}, [dispatch, auth, message.firstLoad])

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
										<i className="fas fa-circle" />
									</UserCard>
								</div>
							))
						}
					</>
			}
			</div>
		</>
	)
}

export default LeftSide