
import { Avatar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <>
            <li className="nav__item"><Link to="/" href="#" class="nav__link"><i class="fas fa-sign-out-alt"></i>Sign Out</Link></li>
            <li className="nav__item"><Link to="/account" className="account__link" href="">AM</Link></li>
        </>
    )
}

export default SignedInLinks