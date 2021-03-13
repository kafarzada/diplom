import React from 'react'
import s from "./Home.module.css"

const CarCard = () => {
    return (
    <div className={s.card}>
        <div className={s.carImg}>
            
        </div>
        <a className={s.carTitle}>Марка</a>
        <h5 className={s.carTitle}>Модель</h5>
        <h6 className={s.carStatus}>статус</h6>
    </div>

    )
}

export default CarCard