import React from 'react'
import Comments from './home/Comments'
import InputComment from './home/InputComment'
import CardBody from './home/postCard/CardBody'
import CardFooter from './home/postCard/CardFooter'
import CardHeader from './home/postCard/CardHeader'

const PostCard = ({ post }) => {
    return (
        <div className="my-3 card">
            <CardHeader post={post} />
            <CardBody post={post} />
            <CardFooter post={post} />
            <Comments post={post} />
            <InputComment post={post} />
        </div>
    )
}

export default PostCard
