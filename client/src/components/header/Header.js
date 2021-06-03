import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'

const Header = () => {
    return (
        <div className="header bg-light">
            <nav className="align-middle navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                <Link className="logo" to="/">
                    <h1 className="p-0 m-0 navbar-brand text-uppercase"
                        onClick={() => window.scrollTo({ top: 0 })}>Logo ❤️</h1>
                </Link>
                <Search />
                <Menu />
            </nav>
        </div>
    )
}

export default Header
