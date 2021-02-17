import React from 'react'
import SignedInLinks from '../layout/SignedInLinks'
import SignedOutLinks from '../layout/SignedOutLinks'

const Header = () => {
    const isAuth = true
    return (
    <header>
        <div className="header__inner">
            <div className="header__logo logo">LOGO</div>
            <div className="header__right">
                <ul className="header__nav nav">

                    {isAuth ? <SignedInLinks /> :  <SignedOutLinks />}

                </ul>
                    
                
            </div>
        </div>  
    </header>
    )
}


export default Header