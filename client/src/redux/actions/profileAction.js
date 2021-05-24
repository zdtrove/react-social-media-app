import { getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'
import { GLOBAL_TYPES, DeleteData } from './globalTypes'

export const PROFILE_TYPES = {
	LOADING_PROFILE: 'LOADING_PROFILE',
	GET_PROFILE_USER: 'GET_PROFILE_USER',
	FOLLOW: 'FOLLOW',
	UNFOLLOW: 'UNFOLLOW',
	GET_PROFILE_ID: 'GET_PROFILE_ID',
	GET_PROFILE_POSTS: 'GET_PROFILE_POSTS'
}

export const getProfileUsers = ({ users, id, auth }) => async dispatch => {
	dispatch({ type: PROFILE_TYPES.GET_PROFILE_ID, payload: id })
	try {
		dispatch({ type: PROFILE_TYPES.LOADING_PROFILE, payload: true })
		const res = getDataAPI(`/user/${id}`, auth.token)
		const res1 = getDataAPI(`/user_posts/${id}`, auth.token)

		const users = await res;
		const posts = await res1;

		dispatch({
			type: PROFILE_TYPES.GET_PROFILE_USER,
			payload: users.data
		})

		dispatch({
			type: PROFILE_TYPES.GET_PROFILE_POSTS,
			payload: posts.data
		})

		dispatch({ type: PROFILE_TYPES.LOADING_PROFILE, payload: false })
	} catch (err) {
		dispatch({
			type: GLOBAL_TYPES.ALERT,
			payload: { error: err.response.data.msg }
		})
	}
}

export const updateProfileUser = ({ userData, avatar, auth }) => async dispatch => {
	try {
		if (!userData.fullname)
			return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: "Please add your full name" } })
		if (userData.fullname.length > 25)
			return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: "Your full name too long" } })
		if (userData.story.length > 200)
			return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: "Your story too long" } })
		try {
			let media
			dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })

			if (avatar) media = await imageUpload([avatar])
			const res = await patchDataAPI("user", {
				...userData,
				avatar: avatar ? media[0].url : auth.user.avatar
			}, auth.token)

			dispatch({
				type: GLOBAL_TYPES.AUTH,
				payload: {
					...auth,
					user: {
						...auth.user,
						...userData,
						avatar: avatar ? media[0].url : auth.user.avatar,
					}
				}
			})

			dispatch({ type: GLOBAL_TYPES.ALERT, payload: { success: res.data.msg } })
		} catch (err) {

		}
	} catch (err) {
		dispatch({
			type: GLOBAL_TYPES.ALERT,
			payload: { error: err.response.data.msg }
		})
	}
}

export const follow = ({ users, user, auth }) => async dispatch => {
	// let newUser = {
	// 	...user,
	// 	followers: [...user.followers, auth.user]
	// }

	let newUser
	if (users.every(item => item._id !== user._id)) {
		newUser = { ...user, followers: [...user.followers, auth.user] }
	} else {
		users.forEach(item => {
			if (item._id === user._id) {
				newUser = { ...item, followers: [...item.followers, auth.user] }
			}
		})
	}

	dispatch({
		type: PROFILE_TYPES.FOLLOW,
		payload: newUser
	})

	dispatch({
		type: GLOBAL_TYPES.AUTH, payload: {
			...auth,
			user: {
				...auth.user,
				following: [...auth.user.following, newUser]
			}
		}
	})

	try {
		await patchDataAPI(`user/${user._id}/follow`, null, auth.token)
	} catch (err) {
		dispatch({
			type: GLOBAL_TYPES.ALERT,
			payload: { error: err.response.data.msg }
		})
	}
}

export const unfollow = ({ users, user, auth }) => async dispatch => {
	// let newUser = {
	// 	...user,
	// 	followers: DeleteData(user.followers, auth.user._id)
	// }

	let newUser
	if (users.every(item => item._id !== user._id)) {
		newUser = { ...user, followers: DeleteData(user.followers, auth.user._id) }
	} else {
		users.forEach(item => {
			if (item._id === user._id) {
				newUser = { ...item, followers: DeleteData(item.followers, auth.user._id) }
			}
		})
	}

	dispatch({
		type: PROFILE_TYPES.UNFOLLOW,
		payload: newUser
	})

	dispatch({
		type: GLOBAL_TYPES.AUTH, payload: {
			...auth,
			user: {
				...auth.user,
				following: DeleteData(auth.user.following, newUser._id)
			}
		}
	})

	try {
		await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token)
	} catch (err) {
		dispatch({
			type: GLOBAL_TYPES.ALERT,
			payload: { error: err.response.data.msg }
		})
	}
}