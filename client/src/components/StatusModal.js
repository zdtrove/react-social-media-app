import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBAL_TYPES } from '../redux/actions/globalTypes'

const StatusModal = () => {
    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])
    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')

    const handleChangeImage = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []
        files.forEach(file => {
            if (!file) return err = "File does not exist"
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return err = "Image format is incorrect"
            }
            return newImages.push(file)
        })
        if (err) dispatch({ type: GLOBAL_TYPES.ALERT, payload: {error: err}})
        setImages([...images, ...newImages])
    }

    const deleteImages = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleStream = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(mediaStream => {
                videoRef.current.srcObject = mediaStream
                videoRef.current.play()
                const track = mediaStream.getTracks()
                setTracks(track[0])
            }).catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        
    }

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
                    <div className="show-images">
                        {images.map((img, index) => (
                            <div key={index} id="file-img">
                                <img
                                    className="img-thumbnail"
                                    src={URL.createObjectURL(img)} 
                                    alt="images"
                                    style={{filter: theme ? 'invert(1)' : 'invert(0)'}}  
                                />
                                <span onClick={() => deleteImages(index)}>&times;</span>
                            </div>
                        ))}
                    </div>
                    {stream &&
                        <div className="stream">
                            <video
                                autoPlay 
                                muted 
                                ref={videoRef}
                                width="100%"
                                height="100%"
                                style={{filter: theme ? 'invert(1)' : 'invert(0)'}}
                            />
                            <span>&times;</span>
                            <canvas ref={refCanvas} />
                        </div>
                    }
                    <div className="input-images">
                        {
                            stream
                                ? <i onClick={handleCapture} className="fas fa-camera" />
                                : <>
                                    <i onClick={handleStream} className="fas fa-camera" />
                                    <div className="file-upload">
                                        <i className="fas fa-image" />
                                        <input onChange={handleChangeImage} type="file" name="file" id="file" multiple accept="image/*" />
                                    </div>
                                </>
                        }
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
