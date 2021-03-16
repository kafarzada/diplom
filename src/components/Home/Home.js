import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { getCars, getUsers } from '../../store/actions/mainActions'
import CarCard from './CarCard'
import s from "./Home.module.css"
import Notification from './Notification'
import UserCard from './UserCard'

class Home extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <div className={s.homeContainer}>
                <div className={s.mainContent}>
                    <h4 className={s.usersTitle} >Пользователи</h4>
                    <div className={s.Row}>
    
                    {
                            this.props.users ? this.props.users.map(user => {
                                return <UserCard userData={user} key={user.id}/>
                            }) : null
                        }
    
                    </div>
    
                    <h4 className={s.carsTitle} >Транспорты</h4>
                    <div className={s.Row}>
                            {
                                this.props.cars ? this.props.cars.map(car => {
                                    return <CarCard carData={car} key={car.id} />
                                }) : null
                            }
                    </div>
                </div>
                
                <Notification />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        users: state.firestore.ordered.client,
        cars: state.firestore.ordered.cars
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'cars', limit: 3, orderBy: "addedDate"},
        {collection: 'client', limit: 3}
    ])
)(Home)