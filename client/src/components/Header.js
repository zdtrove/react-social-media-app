import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authAction'

const Header = () => {
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/' },
        { label: 'Message', icon: 'near_me', path: '/message' },
        { label: 'Discover', icon: 'explore', path: '/discover' },
        { label: 'Notify', icon: 'favorite', path: '/' },
    ]

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <nav className="align-middle navbar navbar-expand-lg navbar-light bg-light justify-content-between">
            <a className="navbar-brand" href="#">Social Media App</a>
            <div className="menu">
                <ul className="flex-row navbar-nav">
                    {navLinks.map((link, index) => (
                        <li key={index} className="nav-item active">
                            <Link className="nav-link" to={link.path}>
                                <span className="material-icons">{link.icon}</span>
                            </Link>
                        </li>
                    ))}
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            User
                        </span>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to={`/profile`}>Profile</Link>
                            <Link className="dropdown-item" to="/">Dark mode</Link>
                            <div className="dropdown-divider"></div>
                            <Link onClick={() => dispatch(logout())} className="dropdown-item" to="/">Logout</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
