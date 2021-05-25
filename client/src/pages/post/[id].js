import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPost } from '../../redux/actions/postAction'
import LoadIcon from '../../images/loading.gif'
import PostCard from '../../components/PostCard'

const Post = () => {
    const { id } = useParams()
    const [post, setPost] = useState([])
    const { auth, detailPost } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost({ detailPost, id, auth }))
        if (detailPost.length > 0) {
            const newArr = detailPost.filter(post => post._id === id)
            setPost(newArr)
        }
    }, [detailPost, dispatch, id, auth])

    return (
        <div className="post">
            {
                post.length === 0 && <img src={LoadIcon} alt="loading" className="mx-auto my-4 d-block" />
            }
            <div className="posts">
                {
                    post.map(item => (
                        <PostCard key={item._id} post={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default Post
