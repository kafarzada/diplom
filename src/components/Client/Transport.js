import React from 'react'
import { Button } from 'react-bootstrap'
import s from "./TransportStyle.module.css"

const Transport = (props) => {
    const {car, carId, userId} = props
    return (
        <div className={s.transport__items}>
            <div className={s.transportImg}></div>
            <div className={s.transport_info}>
                <p><span>Марка: </span>{car.car.marka}</p>
                <p><span>Модель: </span>{car.car.model}</p>
                <p><span>Номер: </span>{car.car.gosNumber}</p>
                <p><span>Статус:</span>{car.car.status}</p>
                <div className={s.transportDelete}><Button
                                                         variant={'outline-danger'}
                                                         onClick={() => {props.removeCar(carId, userId)}}
                                                         >Удалить</Button></div>
            </div>
        </div>
    )
}


export default Transport