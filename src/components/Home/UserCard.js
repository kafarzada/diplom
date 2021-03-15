import React from 'react'
import { Link } from 'react-router-dom'
import s from "./Home.module.css"

const UserCard = (props) => {
    return (
        <div className={s.card}>
            <div className={s.cardImg}>
                
            </div>
            <Link to={"/clientdetails/" + props.userData.id} 
                  className={s.cardTitle}>{props.userData.firstname}</Link>
        </div>
    )
}

export default UserCard