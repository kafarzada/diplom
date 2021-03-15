import React from 'react'
import s from "./Home.module.css"

const CarCard = (props) => {
    console.log(props)
    return (
    <div className={s.card}>
        <div className={s.carImg}>
            
        </div>
        <a className={s.carTitle}>{props.carData.marka}</a>
        <h5 className={s.carTitle}>{props.carData.model}</h5>
        {
            props.carData.status ? <h6 className={s.inside}>На месте</h6> : <h6 className={s.outside}>выехал</h6>
        }
    </div>

    )
}

export default CarCard