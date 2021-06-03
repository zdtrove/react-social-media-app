import React from 'react'
import LeftSide from '../../components/message/LeftSide'
import RightSide from '../../components/message/RightSide'

const Conversation = () => {
	return <div className="message d-flex">
		<div className="px-0 col-md-4 border-right left-message">
			<LeftSide />
		</div>
		<div className="px-0 col-md-8">
			<RightSide />
		</div>
	</div>
}

export default Conversation