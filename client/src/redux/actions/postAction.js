import { GLOBAL_TYPES } from "./globalTypes"
import { imageUpload } from '../../utils/imageUpload'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from "./notifyAction"
import { toast } from 'react-toastify'

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}

export const createPost = ({ content, images, auth, socket }) => async dispatch => {
    let media = []
    try {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
        if (images.length > 0) media = await imageUpload(images)
        const res = await postDataAPI('posts', { content, images: media }, auth.token)
        dispatch({
            type: POST_TYPES.CREATE_POST,
            payload: { ...res.data.newPost, user: auth.user }
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })

        // Notify
        const msg = {
            id: res.data.newPost._id,
            text: 'added a new post',
            recipients: res.data.newPost.user.followers,
            url: `/post/${res.data.newPost._id}`,
            content,
            image: media[0].url
        }
        dispatch(createNotify({ msg, auth, socket }))
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const getPosts = token => async dispatch => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
        const res = await getDataAPI('posts', token)
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: { ...res.data, page: 2 }
        })
        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const updatePost = ({ content, images, auth, status }) => async dispatch => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)
    console.log({ imgNewUrl, imgOldUrl })
    if (status.content === content
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;
    try {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)
        const res = await patchDataAPI(`/post/${status._id}`, {
            content, images: [...imgOldUrl, ...media]
        }, auth.token)
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const likePost = ({ post, auth, socket }) => async dispatch => {
    const newPost = { ...post, likes: [...post.likes, auth.user] }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    socket.emit('likePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.token)
        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your post',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
            content: post.content,
            image: post.images[0].url
        }
        dispatch(createNotify({ msg, auth, socket }))
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const unLikePost = ({ post, auth, socket }) => async dispatch => {
    const newPost = { ...post, likes: post.likes.filter(like => like._id !== auth.user._id) }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    socket.emit('unLikePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)
        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your post',
            recipients: [post.user._id],
            url: `/post/${post._id}`
        }
        dispatch(removeNotify({ msg, auth, socket }))
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const getPost = ({ detailPost, id, auth }) => async dispatch => {
    if (detailPost.every(post => post._id !== id)) {
        try {
            const res = await getDataAPI(`post/${id}`, auth.token)
            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
        } catch (err) {
            toast.dark(err.response.data.msg, {
                position: toast.POSITION.TOP_LEFT
            })
            dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
        }
    }
}

export const deletePost = ({ post, auth, socket }) => async dispatch => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post })
    try {
        const res = await deleteDataAPI(`post/${post._id}`, auth.token)
        // Notify
        const msg = {
            id: post._id,
            text: 'deleted a new post',
            recipients: res.data.newPost.user.followers,
            url: `/post/${post._id}`
        }
        dispatch(removeNotify({ msg, auth, socket }))
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const savedPost = ({ post, auth }) => async dispatch => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] }
    dispatch({ type: GLOBAL_TYPES.AUTH, payload: { ...auth, user: newUser } })
    try {
        await patchDataAPI(`savedPost/${post._id}`, null, auth.token)
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}

export const unSavedPost = ({ post, auth }) => async dispatch => {
    const newUser = { ...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
    dispatch({ type: GLOBAL_TYPES.AUTH, payload: { ...auth, user: newUser } })
    try {
        await patchDataAPI(`unSavedPost/${post._id}`, null, auth.token)
    } catch (err) {
        toast.dark(err.response.data.msg, {
            position: toast.POSITION.TOP_LEFT
        })
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
    }
}