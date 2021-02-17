import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        // <div class="nav">
        //     <div className="nav__inner">
        //         <li className="nav__item"><a href="#" className="nav__link"><i class="fas fa-home"></i></i>Главная</a></li>
        //         <li className="nav__item"><a href="#" className="nav__link"><i class="fas fa-shower"></i>Автомойка</a></li>
        //         <li className="nav__item"><a href="#" className="nav__link"><i class="fas fa-car"></i>Автостоянка</a></li>
        //         <li className="nav__item"><a href="#" className="nav__link"><i class="fas fa-users"></i>Клиенты</a></li>
        //         <li className="nav__item"><a href="#" className="nav__link"><i class="fas fa-sign-out-alt"></i>Транспорты</a></li>
        //         <li className="nav__item"><a href="#" className="nav__link"><i class="fas fa-history"></i>История платежей</a></li>
        //         <li className="nav__item"><a href="#" className="nav__link"><i class="fas fa-file-invoice"></i>Отчеты</a></li>
        //         <li className="nav__item"><a href="#" className="nav__link"><i class="fas fa-cog"></i>Настройки</a></li>
        //     </div>
        // </div>

        <>
            <div className="nav">
                <ul className="nav__inner">
                    <li className="nav__item"><Link className="nav__link" to="/"><i className="fas fa-home"></i>Home</Link></li>
                    <li className="nav__item"><Link className="nav__link" to="/carwash" ><i class="fas fa-shower"></i>Автомойка</Link></li>
                    <li className="nav__item"><Link className="nav__link" to="/parking" ><i class="fas fa-car"></i>Автостоянка</Link></li>
                    <li className="nav__item"><Link className="nav__link" to="/clients" ><i class="fas fa-users"></i>Клиенты</Link></li>
                    <li className="nav__item"><Link className="nav__link" to="/cars" ><i class="fas fa-sign-out-alt"></i>Транспорты</Link></li>
                    <li className="nav__item"><Link className="nav__link" to="/paymenthistory" ><i class="fas fa-history"></i>История Платежей</Link></li>
                    <li className="nav__item"><Link className="nav__link" to="/repords" ><i class="fas fa-file-invoice"></i>Отчеты</Link></li>
                    <li className="nav__item"><Link className="nav__link" to="/settings" ><i class="fas fa-cog"></i>Настройки</Link></li>

                </ul>
            </div>
        </>
    )
}

export default Navbar