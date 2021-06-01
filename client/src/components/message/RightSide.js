import React, { useState, useEffect, useRef } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import MsgDisplay from './MsgDisplay'
import Icons from '../Icons'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { imageShow, videoShow } from '../../utils/mediaShow'
import { imageUpload } from '../../utils/imageUpload'
import { addMessage, deleteConversation, getMessages, loadMoreMessages } from '../../redux/actions/messageAction'
import LoadIcon from '../../images/loading.gif'
import { ITEM_PER_PAGE } from '../../utils/config'

const RightSide = () => {
	const { auth, message, theme, socket } = useSelector(state => state)
	const dispatch = useDispatch()
	const history = useHistory()
	const { id } = useParams()
	const refDisplay = useRef()
	const pageEnd = useRef()
	const [user, setUser] = useState([])
	const [text, setText] = useState('')
	const [media, setMedia] = useState([])
	const [loadMedia, setLoadMedia] = useState(false)
	const [page, setPage] = useState(0)
	const [data, setData] = useState([])
	const [result, setResult] = useState(ITEM_PER_PAGE)
	const [isLoadMore, setIsLoadMore] = useState(0)

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

	const handleDeleteConversation = () => {
		dispatch(deleteConversation({ auth, id }))
		return history.push('/message')
	}

	useEffect(() => {
		const newData = message.data.find(item => item._id === id)
		if (newData) {
			setData(newData.messages)
			setResult(newData.result)
			setPage(newData.page)
		}
	}, [message.data, id])

	useEffect(() => {
		if (id && message.users.length > 0) {
			setTimeout(() => {
				refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
			}, 50)
			const newUser = message.users.find(user => user._id === id)
			if (newUser) setUser(newUser)
		}
	}, [message.users, id])

	// Load More
	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setIsLoadMore(p => p + 1)
			}
		}, {
			threshold: 0.1
		})

		observer.observe(pageEnd.current)
	}, [setIsLoadMore])

	useEffect(() => {
		if (isLoadMore > 1) {
			if (result >= page * ITEM_PER_PAGE) {
				dispatch(loadMoreMessages({ auth, id, page: page + 1 }))
				setIsLoadMore(1)
			}
		}
		// eslint-disable-next-line
	}, [isLoadMore])

	useEffect(() => {
		const getMessagesData = async () => {
			if (message.data.every(item => item._id !== id)) {
				await dispatch(getMessages({ auth, id }))
				setTimeout(() => {
					refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
				}, 50)
			}
		}
		getMessagesData()
	}, [id, dispatch, auth, message.data])

	return <>
		<div className="message__header" style={{ cursor: 'pointer' }}>
			{
				user.length !== 0 &&
				<UserCard user={user}>
					<i className="fas fa-trash text-danger"
						onClick={handleDeleteConversation} />
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
					data.map((msg, index) => (
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
									<MsgDisplay msg={msg} theme={theme} user={auth.user} data={data} />
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