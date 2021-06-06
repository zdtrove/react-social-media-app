import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'
import Logo from '../../images/messenger.png'

const Header = () => {
    return (
        <div className="header bg-light">
            <nav style={{ background: 'rgb(0 123 255 / 25%)' }} className="align-middle navbar navbar-expand-lg navbar-light justify-content-between">
                <Link className="logo" to="/">
                    <h1 className="p-0 m-0 navbar-brand text-uppercase"
                    onClick={() => window.scrollTo({ top: 0 })}>
                        <img src={Logo} alt="logo" />
                    </h1>
                </Link>
                <Search />
                <Menu />
            </nav>
        </div>
    )
}

export default Header
