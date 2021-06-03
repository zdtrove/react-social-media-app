import React from 'react'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import { useSelector } from 'react-redux'

const Followers = ({ users, setShowFollowers }) => {
    const { auth } = useSelector(state => state)

    return (
        <div className="follow">
            <div className="follow-box">
                <h5 className="text-center">Followers</h5>
                <hr />
                <div className="follow-content">
                    {users.map(user => (
                        <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers}>
                            {auth.user._id !== user._id && <FollowBtn user={user} />}
                        </UserCard>
                    ))}
                </div>
                <div onClick={() => setShowFollowers(false)} className="close">&times;</div>
            </div>
        </div>
    )
}

export default Followers
