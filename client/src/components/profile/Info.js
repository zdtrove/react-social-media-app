import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../Avatar'
import { getProfileUsers } from '../../redux/actions/profileAction'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from './Followers'
import Following from './Following'

const Info = () => {
	const { id } = useParams()
	const { auth, profile } = useSelector(state => state)
	const [userData, setUserData] = useState([])
	const dispatch = useDispatch()
	const [onEdit, setOnEdit] = useState(false)
	const [showFollowers, setShowFollowers] = useState(false)
	const [showFollowing, setShowFollowing] = useState(false)

	useEffect(() => {
		if (id === auth.user._id) {
			setUserData([auth.user])
		} else {
			dispatch(getProfileUsers({ users: profile.users, id, auth }))
			const newData = profile.users.filter(user => user._id === id)
			setUserData(newData)
		}
	}, [id, auth, dispatch, profile.users])

	return (
		<div className="info">
			{userData.map(user => (
				<div className="info-container" key={user._id}>
					<Avatar src={user.avatar} size="supper" />
					<div className="info-content">
						<div className="info-content__title">
							<h2>{user.username}</h2>
							{user._id === auth.user._id
								? <button onClick={() => setOnEdit(true)} className="btn btn-outline-info">
									Edit Profile
								</button>
								: <FollowBtn user={user} />
							}
						</div>
						<div className="info-content__followBtn">
							<span onClick={() => setShowFollowers(true)} className="mr-4">
								{user.followers.length} Followers
							</span>
							<span onClick={() => setShowFollowing(true)} className="ml-4">
								{user.following.length} Following
							</span>
						</div>
						<h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
						<p className="m-0">{user.address}</p>
						<h6 className="m-0">{user.email}</h6>
						<a rel="noreferrer" href={user.website} target="_blank">
							{user.website}
						</a>
						<p>{user.story}</p>
					</div>
					{onEdit && <EditProfile setOnEdit={setOnEdit} />}
					{showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers} />}
					{showFollowing && <Following users={user.following} setShowFollowing={setShowFollowing} />}
				</div>
			))}
		</div>
	)
}

export default Info