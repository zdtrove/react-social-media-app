import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({ src, size }) => {
	const { theme } = useSelector(state => state)
	
	return (
		<img 
			style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}`}} 
			className={`${size}-avatar`} 
			src={src} 
			alt="avatar" 
		/>
	)
}

export default Avatar