
import React, { Component } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import { firestoreConnect, useFirestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { getCars, removeCar, removeClient } from '../../store/actions/clientActions'
import s from "./ClientDetail.module.css"
import Transport from './Transport'
import moment from "moment"

function  ClientDetails(props){
    

     const onClickHandlerRemoveCLient = (id) => {
        
        props.removeClient(id)
        props.history.goBack()
    }




    


        const {client, id, totalCar} = props
        useFirestoreConnect({
            collection: "orders", where:["client", "==", id], orderBy: ["order_date", "desc"]
        })

        const orders = useSelector(state => state.firebase.ordered.orders)
        if(client && id) {
            return (
                <div>
                   <div className={s.client__ingo}>
                        <h1>Клиент</h1>
                        <div><span>Фамилия:</span>{client.firstname}</div>
                        <div><span>Имя:</span>{client.lastname}</div>
                        <div><span>Отчество:</span>{client.patronymic}</div>
                        <div><span>Контактный Номер: </span>{client.phone}</div>
                        <div><span>Дата Регистрации: </span>{moment(client.registrationDate.toDate().toString()).calendar()}</div>
                        <div><span>Количсетво Транспорта:</span>{props.totalCar }<Link to={"/newCar/" + id}> <Button variant="outline-secondary" size="sm">Добавить Транспорт</Button></Link></div>
                        <div><span>Бонус:</span>{client.bonus}</div>
                        <Button variant={'danger'} onClick={() => {onClickHandlerRemoveCLient(id)}}>Удалить Клиента</Button>
                   </div>
                   <hr></hr>
                   <div>
                       {
                           orders && orders.map((order, index) => (
                               <div key={index}>
                                   <div>Дата Создание: {new Date(order.order_date)}</div>
                                </div>
                           ))
                       }
                   </div>
                   <div>
                       <h3>Транспортные Средства</h3>
                       <div className={s.transports}>
    
                            {
                                totalCar ===0 ? <p className={s.emptyTransport}>Нет траспорта...</p> :
    
                                props.cars.map((car, index) => {
                                    return <Transport key={index} car={car} carId={car.id} userId={id} removeCar={props.removeCar}/>
                                })
                            }
                       </div>
                   </div>
                </div>
            )
        } else {
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
 

}


const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const clients = state.firestore.data.client
    const client = clients ? clients[id]: null
    const cars = state.firestore.ordered.cars
    
    const newCarList = cars ? cars.filter(item => item.userID == id): []
    console.log(newCarList)
    return {    
        id,
        client,
        cars: newCarList,
        totalCar: newCarList.length
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeClient: (id) => dispatch(removeClient(id)),
        getCars: (uesrId) => dispatch(getCars(uesrId)),
        removeCar: (carId, userId) => dispatch(removeCar(carId, userId))
    }
}   

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: "client"

        },
        {
            collection: "cars"
        }
    ])
)(ClientDetails)