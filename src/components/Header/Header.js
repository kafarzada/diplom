import React from 'react'
import { Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../../store/actions/authActions'
import s from './Header.module.css'

const Header = (props) => {
    const {auth, sigOut} = props

    const onClickHadnlerOut = (e) => {
        e.preventDefault()

        props.signOut()
    }
    return (
    <header>
        <div className={s.header__inner}>
            <h1>LOGO</h1>
            <div className={s.header__nav}>
                {
                    auth.uid ? <Link onClick={onClickHadnlerOut}><i class="bi bi-box-arrow-left"></i></Link>
                             :<Link to="/signin">Войти</Link>
                }
            </div>
        </div>
    </header>
    )
}

const mapStateToProps = (state) => {
    return {
        auth:  state.firebase.auth
    }
}

const mapDipatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(mapStateToProps, mapDipatchToProps)(Header)