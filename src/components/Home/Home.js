import React from 'react'
import CarCard from './CarCard'
import s from "./Home.module.css"
import UserCard from './UserCard'
const Home = () => {
    return (
        <div className={s.homeContainer}>
            <div className={s.mainContent}>
                <h4 className={s.usersTitle} >Пользователи</h4>
                <div className={s.Row}>

                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />

                </div>

                <h4 className={s.carsTitle} >Транспорты</h4>
                <div className={s.Row}>
                    <CarCard />
                    <CarCard />
                    <CarCard />
                </div>
            </div>
            
            <div className={s.notifications}>
                notifications
            </div>
        </div>
    )
}

export default Home