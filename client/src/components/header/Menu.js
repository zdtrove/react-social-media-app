import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'
import NotifyModal from '../NotifyModal'
import Home from '../../images/home.png'
import Chat from '../../images/chat.png'
import Discover from '../../images/discover.png'
import Notification from '../../images/notification.png'

const Menu = () => {
    const navLinks = [
        { label: 'Home', icon: Home, path: '/' },
        { label: 'Message', icon: Chat, path: '/message' },
        { label: 'Discover', icon: Discover, path: '/discover' }
    ]
    const { auth, theme, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const isActive = pn => {
        if (pn === pathname) return 'active'
    }

    return (
        <div className="menu">
            <ul className="flex-row navbar-nav">
                {navLinks.map((link, index) => (
                    <li key={index} className={`nav-item px-2 ${isActive(link.path)}`}>
                        <Link className="nav-link" to={link.path}>
                            <img src={link.icon} alt={link.label} />
                        </Link>
                    </li>
                ))}

                <li className="nav-item dropdown" style={{ opacity: 1 }}>
                    <span className="nav-link position-relative notify-img" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={Notification} alt="notification" />
                        <span className="notify-length">{notify.data.length}</span>
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                        style={{ transform: 'translateX(75px)' }}>
                        <NotifyModal />
                    </div>
                </li>

                <li className="nav-item dropdown" style={{ opacity: 1 }}>
                    <span style={{ transform: 'translateY(-4px)' }} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="medium" />
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>
                        <label
                            htmlFor="theme"
                            className="dropdown-item"
                            onClick={() => dispatch({
                                type: GLOBAL_TYPES.THEME, payload: !theme
                            })}
                        >
                            {theme ? 'Light Mode' : 'Dark mode'}
                        </label>
                        <div className="dropdown-divider"></div>
                        <Link onClick={() => dispatch(logout())} className="dropdown-item" to="/">Logout</Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Menu