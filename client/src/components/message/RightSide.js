import React, { useState, useEffect, useRef } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import MsgDisplay from './MsgDisplay'
import Icons from '../Icons'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { imageShow, videoShow } from '../../utils/mediaShow'
import { imageUpload } from '../../utils/imageUpload'
import { addMessage, getMessages, MESS_TYPES } from '../../redux/actions/messageAction'
import LoadIcon from '../../images/loading.gif'

const RightSide = () => {
	const { auth, message, theme, socket } = useSelector(state => state)
	const dispatch = useDispatch()
	const { id } = useParams()
	const [user, setUser] = useState([])
	const [text, setText] = useState('')
	const [media, setMedia] = useState([])
	const [loadMedia, setLoadMedia] = useState(false)
	const [page, setPage] = useState(0)
	const refDisplay = useRef()
	const pageEnd = useRef()

	const handleChangeMedia = e => {
		const files = [...e.target.files]
		let err = ""
		let newMedia = []
		files.forEach(file => {
			if (!file) return err = "File does not exist"
			if (file.size > 1024 * 1024 * 5) {
				return err = "The image/video largest is 5mb"
			}
			return newMedia.push(file)
		})
		if (err) dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err } })
		setMedia([...media, ...newMedia])
	}

	const handleDeleteMedia = index => {
		const newArr = [...media]
		newArr.splice(index, 1)
		setMedia(newArr)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!text.trim() && media.length === 0) return;
		setText('')
		setMedia([])
		setLoadMedia(true)
		let newArr = []
		if (media.length > 0) newArr = await imageUpload(media)
		const msg = {
			sender: auth.user._id,
			recipient: id,
			text,
			media: newArr,
			createdAt: new Date().toISOString()
		}
		setLoadMedia(false)
		await dispatch(addMessage({ msg, auth, socket }))
		if (refDisplay.current) {
			refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
		}
	}

	useEffect(() => {
		const newUser = message.users.find(user => user._id === id)
		if (newUser) setUser(newUser)
	}, [message.users, id])

	// Load More
	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setPage(p => p + 1)
			}
		}, {
			threshold: 0.1
		})

		observer.observe(pageEnd.current)
	}, [setPage])

	useEffect(() => {
		if (message.resultData >= (page - 1) * 9 && page > 1) {
			dispatch(getMessages({ auth, id, page }))
		}
	}, [message.resultData, page, id, auth, dispatch])

	useEffect(() => {
		if (refDisplay.current) {
			refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
		}
	}, [text])

	useEffect(() => {
		if (id) {
			const getMessagesData = async () => {
				dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: { messages: [] } })
				setPage(1)
				await dispatch(getMessages({ auth, id }))
				if (refDisplay.current) {
					refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
				}
			}

			getMessagesData()
		}
	}, [id, dispatch, auth])

	return <>
		<div className="message__header">
			{
				user.length !== 0 &&
				<UserCard user={user}>
					<i className="fas fa-trash text-danger" />
				</UserCard>
			}

		</div>
		<div className="message__chatContainer"
			style={{ height: media.length > 0 ? 'calc(100% - 180px)' : '' }}>
			<div className="chat-display" ref={refDisplay}>
				<button style={{ marginTop: '-25px', opacity: 0 }} ref={pageEnd}>
					Load more
				</button>
				{
					message.data.map((msg, index) => (
						<div key={index}>
							{
								msg.sender !== auth.user._id &&
								<div className="chat-row other-message">
									<MsgDisplay msg={msg} theme={theme} user={user} />
								</div>
							}
							{
								msg.sender === auth.user._id &&
								<div className="chat-row your-message">
									<MsgDisplay msg={msg} theme={theme} user={auth.user} />
								</div>
							}
						</div>
					))
				}
				{
					loadMedia &&
					<div className="chat-row your-message">
						<img src={LoadIcon} alt="loading" />
					</div>
				}
			</div>
		</div>
		<div className="show-media"
			style={{ display: media.length > 0 ? 'grid' : 'none' }}>
			{
				media.map((item, index) => (
					<div key={index} id="file-media">
						{
							item.type.match(/video/i)
								? videoShow(URL.createObjectURL(item), theme)
								: imageShow(URL.createObjectURL(item), theme)
						}
						<span onClick={() => handleDeleteMedia(index)}>&times;</span>
					</div>
				))
			}
		</div>
		<form className="chat-input" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Enter your message..."
				value={text}
				onChange={e => setText(e.target.value)}
				style={{
					filter: theme ? 'invert(1)' : 'invert(0)',
					background: theme ? '#040404' : '',
					color: theme ? 'white' : ''
				}}
			/>
			<Icons setContent={setText} content={text} theme={theme} />
			<div className="file-upload">
				<i className="fas fa-image text-danger" />
				<input type="file" name="file" id="file"
					multiple accept="image/*,video/*" onChange={handleChangeMedia} />
			</div>

			<button type="submit" disabled={(text || media.length > 0) ? false : true} className="material-icons">
				near_me
			</button>
		</form>
	</>
}

export default RightSide