import React from 'react'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import { useSelector } from 'react-redux'

const Following = ({ users, setShowFollowing }) => {
    const { auth } = useSelector(state => state)

    return (
        <div className="follow">
            <div className="follow-box">
                <h5 className="text-center">Following</h5>
                <hr />
                {users.map(user => (
                    <UserCard key={user._id} user={user} setShowFollowing={setShowFollowing}>
                        {auth.user._id !== user._id && <FollowBtn user={user} />}
                    </UserCard>
                ))}
                <div onClick={() => setShowFollowing(false)} className="close">&times;</div>
            </div>
        </div>
    )
}

export default Following
