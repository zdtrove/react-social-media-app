import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../redux/actions/commentAction'

const InputComment = ({ children, post }) => {
    const [content, setContent] = useState('')
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault();
        if (!content.trim()) return;
        setContent('')
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString()
        }
        dispatch(createComment(post, newComment, auth))
    }

    return (
        <form onSubmit={handleSubmit} className="card-footer comment-input">
            {children}
            <input type="text" placeholder="Add your comment..."
                value={content} onChange={e => setContent(e.target.value)} />
            <button type="submit" className="postBtn">
                Post
            </button>
        </form>
    )
}

export default InputComment