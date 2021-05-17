import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { follow, unfollow } from '../redux/actions/profileAction'

const FollowBtn = ({ user }) => {
	const [followed, setFollowed] = useState(false)
	const { auth, profile } = useSelector(state => state)
	const dispatch = useDispatch()

	useEffect(() => {
		if (auth.user.following.find(item => item._id === user._id)) {
			setFollowed(true)
		}
	}, [auth.user.following, user._id])

	const hanldeFollow = () => {
		setFollowed(true)
		dispatch(follow({ users: profile.users, user, auth }))
	}

	const handleUnfollow = () => {
		setFollowed(false)
		dispatch(unfollow({ users: profile.users, user, auth }))
	}

    return (
        <>
        	{followed
	        	? <button onClick={handleUnfollow} className="btn btn-outline-danger">
	        		Unfollow
	        	</button>
	        	: <button onClick={hanldeFollow} className="btn btn-outline-info">
	        		Follow
	        	</button>
        	}
        </>
    )
}

export default FollowBtn
