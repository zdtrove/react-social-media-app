import React from 'react'
import { useSelector } from 'react-redux'
import Posts from '../components/home/Posts'
import Status from '../components/home/Status'
import LoadIcon from '../images/loading.gif'

const Home = () => {
    const { homePosts } = useSelector(state => state)

    return (
        <div className="mx-0 home row">
            <div className="col-md-8">
                <Status />
                {homePosts.loading
                    ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                    : homePosts.result === 0
                        ? <h2 className="text-center">No Post</h2>
                        : <Posts />
                }
            </div>
            <div className="col-md-4"></div>
        </div>
    )
}

export default Home
