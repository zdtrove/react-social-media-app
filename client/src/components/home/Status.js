import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../Avatar'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'

const Status = () => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="my-3 status d-flex">
            <Avatar src={auth.user.avatar} size="big" />
            <button
                className="statusBtn flex-fill"
                onClick={() => dispatch({
                    type: GLOBAL_TYPES.STATUS,
                    payload: true
                })}
            >
                {auth.user.username}, what are you thinking?
            </button>
        </div>
    )
}

export default Status
