import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const NotifyModal = () => {
    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div style={{ minWidth: '280px' }}>
            <div>
                <h3>Notification</h3>

            </div>
        </div>
    )
}

export default NotifyModal
