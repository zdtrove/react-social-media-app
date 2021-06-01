import React from 'react'
import Avatar from '../Avatar'
import { imageShow, videoShow } from '../../utils/mediaShow'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessages } from '../../redux/actions/messageAction'

const MsgDisplay = ({ user, msg, theme, data }) => {
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()

	const handleDeleteMessages = () => {
		if (data) {
			dispatch(deleteMessages({ msg, data, auth }))
		}
	}

	return (
		<>
			<div className="chat-title">
				<Avatar src={user.avatar} size="small" />
				<span>{user.username}</span>
			</div>
			<div className="your-content">
				{
					user._id === auth.user._id &&
					<i className="fas fa-trash text-danger"
						onClick={handleDeleteMessages} />
				}

				<div>
					{
						msg.text &&
						<div className="chat-text"
							style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
							{msg.text}
						</div>
					}
					{
						msg.media.map((item, index) => (
							<div key={index}>
								{
									item.url.match(/video/i)
										? videoShow(item.url, theme)
										: imageShow(item.url, theme)
								}
							</div>
						))
					}
				</div>
			</div>
			<div className="chat-time">
				{new Date(msg.createdAt).toLocaleString()}
			</div>
		</>
	)
}

export default MsgDisplay