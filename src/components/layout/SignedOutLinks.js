
import React from 'react'
import { Link } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <>
            <li className="nav__item"><Link to="/signup" className="nav__link"><i class="fas fa-user-plus"></i> Sign Up</Link></li>
            <li className="nav__item"><Link to="/signin" className="nav__link"><i class="fas fa-sign-in-alt"></i>Sign In</Link></li>
        </>
    )
}

export default SignedOutLinks