import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import LoadIcon from '../../images/loading.gif'
import { getSuggestions } from '../../redux/actions/suggestionsAction'

const RightSideBar = () => {
    const { auth, suggestions } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {

    })

    return (
        <div className="mt-3">
            <UserCard user={auth.user} />
            <div className="my-2 d-flex justify-content-between align-items-center">
                <h5 className="text-danger">Suggestions for you</h5>
                {
                    !suggestions.loading && <i onClick={() => dispatch(getSuggestions(auth.token))} style={{ cursor: 'pointer' }} className="fas fa-redo" />
                }

            </div>
            {
                suggestions.loading
                    ? <img src={LoadIcon} alt="loading" className="mx-auto my-4 d-block" />
                    : <div className="suggestions">
                        {
                            suggestions.users.map(user => (
                                <UserCard key={user._id} user={user}>
                                    <FollowBtn user={user} />
                                </UserCard>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default RightSideBar
