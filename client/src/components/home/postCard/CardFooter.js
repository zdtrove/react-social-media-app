import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { likePost, unLikePost, savedPost, unSavedPost } from '../../../redux/actions/postAction'
import LikeButton from '../../LikeButton'
import ShareModal from '../../ShareModal'
import { BASE_URL } from '../../../utils/config'
import MessageIcon from '../../../images/message.png'
import ShareIcon from '../../../images/share.png'

const CardFooter = ({ post }) => {
	const { auth, theme, socket } = useSelector(state => state)
	const dispatch = useDispatch()

	const [isLike, setIsLike] = useState(false)
	const [loadLike, setLoadLike] = useState(false)
	const [isShare, setIsShare] = useState(false)
	const [saved, setSaved] = useState(false)
	const [savedLoad, setSavedLoad] = useState(false)

	useEffect(() => {
		if (post.likes.find(like => like._id === auth.user._id)) {
			setIsLike(true)
		} else {
			setIsLike(false)
		}
	}, [post.likes, auth.user._id])

	useEffect(() => {
		if (auth.user.saved.find(id => id === post._id)) {
			setSaved(true)
		} else {
			setSaved(false)
		}
	}, [auth.user.saved, post._id])

	const handleLike = async () => {
		if (loadLike) return;
		setLoadLike(true)
		await dispatch(likePost({ post, auth, socket }))
		setLoadLike(false)
	}

	const handleUnLike = async () => {
		if (loadLike) return;
		setLoadLike(true)
		await dispatch(unLikePost({ post, auth, socket }))
		setLoadLike(false)
	}

	const handleSavedPost = async () => {
		if (savedLoad) return;
		setSavedLoad(true)
		await dispatch(savedPost({ post, auth }))
		setSavedLoad(false)
	}

	const handleUnSavedPost = async () => {
		if (savedLoad) return;
		setSavedLoad(true)
		await dispatch(unSavedPost({ post, auth }))
		setSavedLoad(false)
	}

	return (
		<div className="cardFooter">
			<div className="card-icon-menu">
				<div>
					<LikeButton
						isLike={isLike}
						handleLike={handleLike}
						handleUnLike={handleUnLike}
					/>
					<Link to={`/post/${post._id}`} className="text-dark">
						<img className="mx-3" src={MessageIcon} alt="message" />
					</Link>
					<img className="mr-3" style={{ width: '25px', height: '25px' }} onClick={() => setIsShare(!isShare)} src={ShareIcon} alt="share" />
				</div>
				{
					saved
						? <i onClick={handleUnSavedPost} className="fas fa-bookmark text-info" />
						: <i onClick={handleSavedPost} className="far fa-bookmark" />
				}
			</div>
			<div className="d-flex justify-content-between">
				<h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
					{post.likes.length} likes
        		</h6>
				<h6 style={{ padding: '0 30px', cursor: 'pointer' }}>
					{post.comments.length} comments
        		</h6>
			</div>
			{
				isShare &&
				<ShareModal theme={theme} url={`${BASE_URL}/post/${post._id}`} />
			}
		</div>
	)
}

export default CardFooter
