import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing }) => {
	const handleCloseAll = () => {
		if (handleClose) handleClose()
		if (setShowFollowers) setShowFollowers(false)
		if (setShowFollowing) setShowFollowing(false)
	}

	return (
		<div className={`d-flex p-2 align-items-center justify-content-between ${border}`}>
			<Link className="d-flex align-items-center" to={`/profile/${user._id}`} onClick={handleCloseAll}>
				<Avatar src={user.avatar} size="big" />
				<div className="ml-1" style={{ transform: 'translateY(-2px)' }}>
					<span className="d-block">{user.username}</span>
					<small style={{ opacity: 0.7 }}>{user.fullname}</small>
				</div>
			</Link>
			{children}
		</div>
	)
}

export default UserCard