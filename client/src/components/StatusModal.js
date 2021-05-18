import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBAL_TYPES } from '../redux/actions/globalTypes'

const StatusModal = () => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')

    return (
        <div className="status-modal">
            <form>
                <div className="status-header">
                    <h5 className="m-0">Create Post</h5>
                    <span onClick={() => dispatch({
                        type: GLOBAL_TYPES.STATUS,
                        payload: false
                    })}>&times;</span>
                </div>
                <div className="status-body">
                    <textarea
                        name="content"
                        placeholder={`${auth.user.username}, what are you thinking?`}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <div className="input-images">
                        <i className="fas fa-camera" />
                        <div className="file-upload">
                            <i className="fas fa-image" />
                            <input type="file" name="file" id="file" multiple accept="image/*" />
                        </div>
                    </div>
                </div>
                <div className="status-footer">
                    <button className="btn btn-secondary w-100">Post</button>
                </div>
            </form>
        </div>
    )
}

export default StatusModal
