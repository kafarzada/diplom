import React from 'react'
import { Nav } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'
import { connect, useSelector } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { changeIsNewOrder } from '../../../store/actions/autoWashActions'

const Navbar = (props) => {
    const {setting} = useSelector(state => state.firestore.data)
    const newOrder = setting && setting["FOJgu4rX7NgMXo0cJpTt"].newOrder

    const style = {
        background: "red",
        display: newOrder ? "inline-block" : "none",
        width: "10px",
        height: "10px",
        borderRadius: "50%"

    }
    return (
        <ul className={"navParking"}>
            <li className="nav__item"><Link to="/">Главная</Link></li>   
            <li className="nav__item"><Link to="/parking">Автостоянка</Link></li>   
            <li className="nav__item"><Link to="/carwash" onClick={() => props.changeStatus()}>Автомойка <span style={style}></span></Link></li>   
            <li className="nav__item"><Link to="/clients">Клиенты</Link></li>   
            <li className="nav__item"><Link to="/employee">Сотрудники</Link></li>  
            <li className="nav__item"><Link to="/service">Услуги</Link></li>  
            <li className="nav__item"><Link to="/report">Отчеты</Link></li> 
            <li className="nav__item"><Link to="/history">История платежей</Link></li>   
            <li className="nav__item"><Link to="/settings">Настройки</Link></li>   
        </ul>
    )
}

export default compose(
    firestoreConnect([
        {collection: "setting"}
    ]),
    connect(null,
    (dispatch) => {
        return {
            changeStatus: () => dispatch(changeIsNewOrder())
        }
    })
)(Navbar)