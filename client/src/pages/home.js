import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Posts from '../components/home/Posts'
import RightSideBar from '../components/home/RightSideBar'
import Status from '../components/home/Status'
import LoadIcon from '../images/loading.gif'

let scroll = 0

const Home = () => {
    const { homePosts } = useSelector(state => state)
    window.addEventListener('scroll', () => {
        if (window.location.pathname === '/') {
            scroll = window.pageYOffset
            return scroll
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: scroll, behavior: 'smooth' })
        }, 100)
    }, [])

    return (
        <div className="mx-0 home row">
            <div className="col-md-8">
                <Status />
                {homePosts.loading
                    ? <img src={LoadIcon} alt="loading" className="mx-auto d-block" />
                    : (homePosts.result === 0 && homePosts.posts.length === 0)
                        ? <h2 className="text-center">No Post</h2>
                        : <Posts />
                }
            </div>
            <div className="col-md-4">
                <RightSideBar />
            </div>
        </div>
    )
}

export default Home
