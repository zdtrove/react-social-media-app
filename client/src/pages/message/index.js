import React from 'react'
import LeftSide from '../../components/message/LeftSide'
import Messenger from '../../images/messenger.png'

const Message = () => {
	return (
		<div className="message d-flex">
			<div className="px-0 col-md-4 border-right">
				<LeftSide />
			</div>
			<div className="px-0 col-md-8 right-message">
				<div className="d-flex justify-content-center align-items-center flex-column h-100">
					<img src={Messenger} alt="messenger" />
					<h4>Messenger</h4>
				</div>
			</div>
		</div>
	)
}

export default Message