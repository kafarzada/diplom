import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { getCars, getUsers } from '../../store/actions/mainActions'
import CarCard from './CarCard'
import s from "./Home.module.css"
import UserCard from './UserCard'
class Home extends Component {
    componentDidMount() {
        this.props.getUsers()
        this.props.getCars()
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
                
                <div className={s.notifications}>
                    <div className={s.notifications_wrapper}>
                        <h4>Уведомления</h4>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.main.users,
        cars: state.main.cars
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch( getUsers() ),
        getCars: () => dispatch(getCars() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)