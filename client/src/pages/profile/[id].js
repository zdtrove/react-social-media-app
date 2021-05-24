import React, { useEffect } from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import { useDispatch, useSelector } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'

const Profile = () => {
	const { profile, auth } = useSelector(state => state)
	const { id } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		if (profile.ids.every(item => item !== id)) {
			dispatch(getProfileUsers({ users: profile.users, id, auth }))
		}
	}, [id, profile.users, auth, dispatch])

	return (
		<div className="profile">
			{profile.loading
				? <img className="mx-auto my-4 d-block" src={LoadIcon} alt="loading" />
				: <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
			}
			<Posts />
		</div>
	)
}

export default Profile