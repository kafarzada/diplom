import React from 'react'
import s from "./Home.module.css"

const UserCard = () => {
    return (
        <div className={s.card}>
            <div className={s.cardImg}>
                
            </div>
            <a className={s.cardTitle}>Name</a>
        </div>
    )
}

export default UserCard