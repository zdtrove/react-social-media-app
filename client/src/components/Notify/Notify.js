import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
    const { notify } = useSelector(state => state)
    return (
        <div>
            {notify.loading && <Loading />}
            {notify.error &&
                <Toast
                    msg={{ title: 'Failed', body: notify.error }}
                    handleShow=""
                    bgColor="bg-danger"
                />
            }
            {notify.success &&
                <Toast
                    msg={{ title: 'Success', body: notify.success }}
                    handleShow=""
                    bgColor="bg-success"
                />
            }
        </div>
    )
}

export default Notify
