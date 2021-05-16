import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import UserCard from '../UserCard'
import LoadIcon from '../../images/loading.gif'

const Search = () => {
	const [search, setSearch] = useState('')
	const [users, setUsers] = useState([])
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()
	const [load, setLoad] = useState(false)

	// useEffect(() => {
	// 	if (search) {
	// 		getDataAPI(`search?username=${search}`, auth.token)
	// 			.then(res => setUsers(res.data.users))
	// 			.catch(err => {
	// 				dispatch({ 
	// 					type: GLOBAL_TYPES.ALERT, 
	// 					payload: { error: err.response.data.msg }
	// 				})
	// 			})
	// 	} else {
	// 		setUsers([])
	// 	}
	// }, [search, auth.token, dispatch])

	const handleSearch = async e => {
		e.preventDefault()
		if (!search) return;
		try {
			setLoad(true)
			const res = await getDataAPI(`search?username=${search}`, auth.token)
			setUsers(res.data.users)
			setLoad(false)
		} catch (err) {
			dispatch({ 
				type: GLOBAL_TYPES.ALERT, 
				payload: { error: err.response.data.msg }
			})
		}
	}

	const handleClose = () => {
		setSearch('')
		setUsers([])
	}

	return (
		<form onSubmit={handleSearch} className="search-form">
			<input
				type="text" 
				name="search"
				id="search"
				value={search}
				onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
			/>
			<div className="search-icon" style={{ opacity: search ? 0: 0.3 }}>
				<span className="material-icons">search</span>
				<span>Search</span>
			</div>
			<div
				onClick={handleClose}
				style={{ opacity: users.length === 0 ? 0 : 1}} 
				className="close-search"
			>
				&times;
			</div>
			<button style={{ display: 'none' }} type="submit">Search</button>
			{load && <img className="loading" src={LoadIcon} alt="loading" />}
			<div className="users">
				{search && users.map(user => (
					<UserCard
						key={user._id}
						user={user} 
						border="border"
						handleClose={handleClose}
					/>
				))}
			</div>
		</form>
	)
}

export default Search