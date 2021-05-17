import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import Toast from './Toast'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'

const Alert = () => {
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            {alert.loading && <Loading />}
            {alert.error &&
                <Toast
                    msg={{ title: 'Error', body: alert.error }}
                    handleShow={() => dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} })}
                    bgColor="bg-danger"
                />
            }
            {alert.success &&
                <Toast
                    msg={{ title: 'Success', body: alert.success }}
                    handleShow={() => dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} })}
                    bgColor="bg-success"
                />
            }
        </div>
    )
}

export default Alert
