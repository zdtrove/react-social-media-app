import React, { useEffect, useState } from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import { useDispatch, useSelector } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import Saved from '../../components/profile/Saved'

const Profile = () => {
	const { profile, auth } = useSelector(state => state)
	const { id } = useParams()
	const dispatch = useDispatch()
	const [savedTab, setSavedTab] = useState(false)

	useEffect(() => {
		if (profile.ids.every(item => item !== id)) {
			dispatch(getProfileUsers({ id, auth }))
		}
	}, [id, profile.ids, auth, dispatch])

	return (
		<div className="profile">
			<Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

			{
				auth.user._id === id &&
				<div className="profile-tab">
					<button onClick={() => setSavedTab(false)} className={savedTab ? '' : 'active'}>Posts</button>
					<button onClick={() => setSavedTab(true)} className={savedTab ? 'active' : ''}>Saved</button>
				</div>
			}
			{profile.loading
				? <img className="mx-auto my-4 d-block" src={LoadIcon} alt="loading" />
				: <>
					{
						savedTab
							? <Saved auth={auth} dispatch={dispatch} />
							: <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
					}
				</>
			}
		</div>
	)
}

export default Profile