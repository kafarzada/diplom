import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <ul className={"navParking"}>
            <li className="nav__item"><Link to="/">Главная</Link></li>   
            <li className="nav__item"><Link to="/parking">Автостоянка</Link></li>   
            <li className="nav__item"><Link to="/carwash">Автомойка</Link></li>   
            <li className="nav__item"><Link to="/clients">Клиенты</Link></li>   
            <li className="nav__item"><Link to="/employee">Сотрудники</Link></li>   
            <li className="nav__item"><Link to="/history">История платежей</Link></li>   
            <li className="nav__item"><Link to="/settings">Настройки</Link></li>   

        </ul>
    )
}

export default Navbar