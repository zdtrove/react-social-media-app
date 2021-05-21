import React, { useEffect, useState } from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import LikeButton from '../../LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import CommentMenu from './CommentMenu'
import { updateComment } from '../../../redux/actions/commentAction'

const CommentCard = ({ comment, post }) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        setContent(comment.content)
    }, [comment])

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }

    const handleLike = () => {

    }

    const handleUnLike = () => {

    }

    const handleUpdate = () => {
        if (comment.content !== content) {
            dispatch(updateComment({ comment, post, content, auth }))
            setOnEdit(false)
        } else {
            setOnEdit(false)
        }
    }

    return (
        <div className="mt-2 comment-card" style={styleCard}>
            <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
                <Avatar src={comment.user.avatar} size="small" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>
            <div className="comment-content">
                <div className="flex-fill">
                    {
                        onEdit
                            ? <textarea rows="5" value={content} onChange={e => setContent(e.target.value)} />
                            : <div>
                                <span>
                                    {
                                        content.length < 100 ? content :
                                            readMore ? content + ' ' : content.slice(0, 100) + '...'
                                    }
                                </span>
                                {
                                    content.length > 100 &&
                                    <span className="readMore" onClick={() => setReadMore(!readMore)}>
                                        {readMore ? 'Hide content' : 'Read more'}
                                    </span>
                                }
                            </div>
                    }

                    <div>
                        <small className="mr-3 text-muted">
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className="mr-3 font-weight-bold">
                            {comment.likes.length} likes
                        </small>
                        {
                            onEdit
                                ? <>
                                    <small onClick={handleUpdate} className="mr-3 font-weight-bold">
                                        update
                                    </small>
                                    <small onClick={() => setOnEdit(false)} className="mr-3 font-weight-bold">
                                        cancel
                                    </small>
                                </>
                                : <small className="mr-3 font-weight-bold">
                                    reply
                                </small>
                        }
                    </div>
                </div>
                <div className="mx-2 d-flex align-items-center" style={{ cursor: 'pointer' }}>
                    <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                </div>
            </div>
        </div>
    )
}

export default CommentCard
