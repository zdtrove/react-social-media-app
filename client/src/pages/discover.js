import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DISCOVER_TYPES, getDiscoverPosts } from '../redux/actions/discoverAction'
import LoadIcon from '../images/loading.gif'
import PostThumb from '../components/PostThumb'
import LoadMoreBtn from '../components/LoadMoreBtn'
import { getDataAPI } from '../utils/fetchData'
import { ITEM_PER_PAGE } from '../utils/config'

const Discover = () => {
	const { auth, discover } = useSelector(state => state)
	const dispatch = useDispatch()
	const [load, setLoad] = useState(false)

	useEffect(() => {
		if (!discover.firstLoad) {
			dispatch(getDiscoverPosts(auth.token))
		}
	}, [dispatch, auth.token, discover.firstLoad])

	const handleLoadMore = async () => {
		setLoad(true)
		const res = await getDataAPI(`post_discover?num=${discover.page * ITEM_PER_PAGE}`, auth.token)
		dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data })
		setLoad(false)
	}

	return (
		<div>
			{
				discover.loading
					? <img src={LoadIcon} alt="Loading" className="mx-auto my-4 d-block" />
					: <PostThumb posts={discover.posts} result={discover.result} />
			}
			{
				load && <img src={LoadIcon} alt="Loading" className="mx-auto my-4 d-block" />
			}
			{
				!discover.loading && <LoadMoreBtn result={discover.result} page={discover.page} load={load} handleLoadMore={handleLoadMore} />
			}
		</div>
	)
}

export default Discover