import { patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { EditData, GLOBAL_TYPES } from './globalTypes'
import { POST_TYPES } from './postAction'

export const createComment = (post, newComment, auth) => async dispatch => {
    const newPost = { ...post, comments: [...post.comments, newComment] }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
        const data = { ...newComment, postId: post._id }
        const res = await postDataAPI('comment', data, auth.token)

        const newData = { ...res.data.newComment, user: auth.user }
        const newPost = { ...post, comments: [...post.comments, newData] }
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    } catch (err) {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const updateComment = ({ comment, post, content, auth }) => async dispatch => {
    const newComments = EditData(post.comments, comment._id, { ...comment, content })
    const newPost = { ...post, comments: newComments }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    try {
        await patchDataAPI(`comment/${comment._id}`, { content }, auth.token)
    } catch (err) {
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}