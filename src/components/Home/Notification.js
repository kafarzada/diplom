import moment from 'moment';
import React from 'react'
import s from "./Home.module.css"

const Notification = (props) => {
    const {notifications} = props
    console.log(notifications);
    return (
        <div className={s.notifications}>
        <div className={s.notifications_wrapper}>
            <h4>Уведомления</h4>
            
            {
                 notifications && notifications.map(item => {
                     return (
                         <div className={s.notification}>
                             <div className={s.notification__content}> <span>Действие: </span>{item.content}</div>
                             <div className={s.notification__user}> <span>Пользователь:</span>{item.user}</div>
                             <div className={s.notification__time}><span>Время:</span>{moment(item.time.toDate().toString()).calendar()}</div>
                         </div>
                     )
                 })
            }
        </div>
    </div>
    )
}


export default Notification 