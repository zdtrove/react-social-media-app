import React from 'react'

const CommentMenu = ({ post, comment, auth, setOnEdit }) => {
    const MenuItem = () => {
        return (
            <>
                <div className="dropdown-item" onClick={() => setOnEdit(true)}>
                    <span className="material-icons">create</span> edit
                </div>
                <div className="dropdown-item">
                    <span className="material-icons">delete_outline</span> remove
                </div>
            </>
        )
    }
    return (
        <div className="menu">
            {
                (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
                <div className="nav-item dropdown">
                    <span className="material-icons" id="moreLink" data-toggle="dropdown">
                        more_vert
                    </span>
                    <div className="dropdown-menu" aria-labelledby="moreLink">
                        {
                            post.user._id === auth.user._id
                                ? comment.user._id === auth.user._id
                                    ? MenuItem()
                                    : <div className="dropdown-item">
                                        <span className="material-icons">delete_outline</span> remove
                                    </div>
                                : comment.user._id === auth.user._id && MenuItem()
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentMenu
