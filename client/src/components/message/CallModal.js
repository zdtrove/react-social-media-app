import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../Avatar'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { addMessage } from '../../redux/actions/messageAction'
import RingRing from '../../audio/ringring.mp3'

const CallModal = () => {
	const { call, auth, peer, socket, theme } = useSelector(state => state)
	const dispatch = useDispatch()
	const [mins, setMins] = useState(0)
	const [second, setSecond] = useState(0)
	const [total, setTotal] = useState(0)
	const [answer, setAnswer] = useState(false)
	const [hours, setHours] = useState(0)
	const yourVideo = useRef()
	const otherVideo = useRef()
	const [tracks, setTracks] = useState(null)

	// Set Time
	useEffect(() => {
		const setTime = () => {
			setTotal(t => t + 1)
			setTimeout(setTime, 1000)
		}
		setTime()

		return () => setTotal(0)
	}, [])

	useEffect(() => {
		setSecond(total%60)
		setMins(parseInt(total/60))
		setHours(parseInt(total/3600))
	}, [total])

	// End Call
	const addCallMessage = useCallback((call, times, disconnect) => {
		if (call.recipient !== auth.user._id || disconnect) {
			const msg = {
				sender: call.sender,
				recipient: call.recipient,
				text: '',
				media: [],
				call: {video: call.video, times},
				createdAt: new Date().toISOString()
			}
			dispatch(addMessage({ msg, auth, socket }))
		}
	}, [auth, dispatch, socket])

	const handleEndCall = () => {
		tracks && tracks.forEach(track => track.stop())
		let times = answer ? total : 0
		socket.emit('endCall', {...call, times})

		addCallMessage(call, times)
		dispatch({ type: GLOBAL_TYPES.CALL, payload: null })
	}

	useEffect(() => {
		if (answer) {
			setTotal(0)
		} else {
			const timer = setTimeout(() => {
				socket.emit('endCall', {...call, times: 0})
				addCallMessage(call, 0)
				dispatch({ type: GLOBAL_TYPES.CALL, payload: null })
			}, 15000)

			return () => clearTimeout(timer)
		}
		
	}, [dispatch, answer, socket, addCallMessage, call])

	useEffect(() => {
		socket.on('endCallToClient', data => {
			tracks && tracks.forEach(track => track.stop())
			addCallMessage(data, data.times)
			dispatch({ type: GLOBAL_TYPES.CALL, payload: null })
		})

		return () => socket.off('endCallToClient')
	}, [socket, dispatch, tracks, addCallMessage])

	// Stream Media
	const openStream = video => {
		const config = { audio: true, video }
		return navigator.mediaDevices.getUserMedia(config)
	}

	const playStream = (tag, stream) => {
		let video = tag
		video.srcObject = stream
		video.play()
	}

	// Answer Call
	const handleAnswer = () => {
		openStream(call.video).then(stream => {
			playStream(yourVideo.current, stream)
			const track = stream.getTracks()
			setTracks(track)
			const newCall = peer.call(call.peerId, stream)
			newCall.on('stream', function(remoteStream) {
				playStream(otherVideo.current, remoteStream)
			})
			setAnswer(true)
		})
	}

	useEffect(() => {
		peer.on('call', newCall => {
			openStream(call.video).then(stream => {
				if (yourVideo.current) {
					playStream(yourVideo.current, stream)
				}
				const track = stream.getTracks()
				setTracks(track)
				newCall.answer(stream)
				newCall.on('stream', function(remoteStream) {
					if (otherVideo.current) {
						playStream(otherVideo.current, remoteStream)
					}
				})
				setAnswer(true)
			})
		})

		return () => peer.removeListener('call')
	}, [peer, call.video])

	// Disconnect
	useEffect(() => {
		socket.on('callerDisconnect', () => {
			tracks && tracks.forEach(track => track.stop())
			let times = answer ? total : 0
			addCallMessage(call, times, true)
			dispatch({ type: GLOBAL_TYPES.CALL, payload: null })
			dispatch({ 
				type: GLOBAL_TYPES.ALERT, 
				payload: { error: `User ${call.username} disconnect` } 
			})
		})

		return () => socket.off('callerDisconnect')
	}, [socket, tracks, dispatch, call, addCallMessage, answer, total])

	// Play - Pause Audio
	const playAudio = newAudio => {
		newAudio.play()
	}

	const pauseAudio = newAudio => {
		newAudio.pause()
		newAudio.currentTime = 0
	}

	useEffect(() => {
		let newAudio = new Audio(RingRing)
		if (answer) {
			pauseAudio(newAudio)
			console.log('-----PAUSE-----')
		} else {
			playAudio(newAudio)
			console.log('-----PLAY-----')
		}
	}, [answer])


	return (
		<div className="call-modal">
			<div className="call-box" style={{
				display: (answer && call.video) ? 'none' : 'flex'
			}}>
				<div className="text-center" style={{ padding: '40px 0' }}>
					<Avatar src={call.avatar} size="super" />
					<h4>{call.username}</h4>
					<h6>{call.fullname}</h6>
					{
						answer
							? <div>
								<span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
								<span>:</span>
								<span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
								<span>:</span>
								<span>{second.toString().length < 2 ? '0' + second : second}</span>
							</div>
							: <div>
								{
									call.video
										? <span>callling video...</span>
										: <span>calling audio...</span>
								}
							</div>
					}
				</div>
				{
					!answer &&
					<div className="timer">
						<small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
						<small>:</small>
						<small>{second.toString().length < 2 ? '0' + second : second}</small>
					</div>
				}
				
				<div className="call-menu">
					<span className="material-icons text-danger"
					onClick={handleEndCall}>
						call_end
					</span>
					{
						(call.recipient === auth.user._id && !answer) &&
						<>
							{
								call.video
									? <span className="material-icons text-success"
									onClick={handleAnswer}>
										videocam
									</span>
									: <span className="material-icons text-success"
									onClick={handleAnswer}>
										call
									</span>
							}
						</>
					}
				</div>
			</div>
			<div className="show-video" style={{
				opacity: (answer && call.video) ? '1' : '0',
				filter: theme ? 'invert(1)' : 'invert(0)'
			}}>
				<video ref={yourVideo} className="your-video" />
				<video ref={otherVideo} className="other-video" />

				<div className="time-video">
					<span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
					<span>:</span>
					<span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
					<span>:</span>
					<span>{second.toString().length < 2 ? '0' + second : second}</span>
				</div>

				<span className="material-icons text-danger end-call"
				onClick={handleEndCall}>
					call_end
				</span>
			</div>
		</div>
	)
}

export default CallModal