import React from 'react'
import CommentCard from './CommentCard'

const CommentDisplay = ({ comment, post }) => {
    return (
        <div className="comment-display">
            <CommentCard comment={comment} post={post} />
        </div>
    )
}

export default CommentDisplay
