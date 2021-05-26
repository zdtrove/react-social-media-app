import React, { useState, useEffect } from 'react'
import LoadMoreBtn from '../LoadMoreBtn'
import PostThumb from '../PostThumb'
import LoadIcon from '../../images/loading.gif'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'

const Saved = ({ auth, dispatch }) => {
    const [savedPosts, setSavedPosts] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(2)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        getDataAPI('getSavedPosts', auth.token)
            .then(res => {
                setSavedPosts(res.data.savedPosts)
                setResult(res.data.result)
                setLoad(false)
            })
            .catch(err => {
                dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } })
            })
        return () => setSavedPosts([])
    }, [auth.token, dispatch])

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`getSavedPosts?limit=${page * 9}`, auth.token)
        setSavedPosts(res.data.savedPosts)
        setResult(res.data.result)
        setPage(page + 1)
        setLoad(false)
    }

    return (
        <div>
            <PostThumb posts={savedPosts} result={result} />
            {
                load && <img src={LoadIcon} alt="Loading" className="mx-auto my-4 d-block" />
            }

            <LoadMoreBtn result={result} page={page} load={load} handleLoadMore={handleLoadMore} />

        </div>
    )
}

export default Saved