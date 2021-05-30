import React from 'react'
import Avatar from '../Avatar'
import { imageShow, videoShow } from '../../utils/mediaShow'

const MsgDisplay = ({ user, msg, theme }) => {
	return (
		<>
			<div className="chat-title">
				<Avatar  src={user.avatar} size="small" />
				<span>{user.username}</span>
			</div>
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
			<div className="chat-time">
				{new Date(msg.createdAt).toLocaleString()}
			</div>
		</>
	)
}

export default MsgDisplay