import React, { useState, useEffect } from 'react'
import LoadMoreBtn from '../LoadMoreBtn'
import PostThumb from '../PostThumb'
import LoadIcon from '../../images/loading.gif'
import { getDataAPI } from '../../utils/fetchData'
import { PROFILE_TYPES } from '../../redux/actions/profileAction'
import { ITEM_PER_PAGE } from '../../utils/config'

const Posts = ({ auth, id, dispatch, profile }) => {
	const [posts, setPosts] = useState([])
	const [result, setResult] = useState(ITEM_PER_PAGE)
	const [page, setPage] = useState(0)
	const [load, setLoad] = useState(false)

	useEffect(() => {
		profile.posts.forEach(data => {
			if (data._id === id) {
				setPosts(data.posts)
				setResult(data.result)
				setPage(data.page)
			}
		})
	}, [profile.posts, id])

	const handleLoadMore = async () => {
		setLoad(true)
		const res = await getDataAPI(`user_posts/${id}?limit=${page * ITEM_PER_PAGE}`, auth.token)
		const newData = { ...res.data, page: page + 1, _id: id }
		dispatch({ type: PROFILE_TYPES.UPDATE_PROFILE_POST, payload: newData })
		setLoad(false)
	}

	return (
		<div>
			<PostThumb posts={posts} result={result} />
			{
				load && <img src={LoadIcon} alt="Loading" className="mx-auto my-4 d-block" />
			}

			<LoadMoreBtn result={result} page={page} load={load} handleLoadMore={handleLoadMore} />

		</div>
	)
}

export default Posts