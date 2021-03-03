import React, { Component, useState } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addClient } from '../../store/actions/clientActions'
import s from "./FormStyle.module.css"


class NewClient extends Component {
    
    state = {
        firstname: '',
        lastname: '',
        patronymic: "",
        phone: "",
        age: '',
        cars: 0,
        scope: 0,
        registrationDate: new Date()
    }

     hadlerChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    addNewClient = () => {
        this.props.addClient(this.state)
        this.props.history.goBack()
    }
    render() {
        return (
            <div className={s.formContaienr}> 
            <h1 className={s.formTitle} >Новый Пользователь</h1>
            <form>
                 <input className={s.inputStyle} type="text" placeholder="Фамилия" id="firstname" onChange={this.hadlerChange}/>
                 <input className={s.inputStyle} type="text" placeholder="Имя" id="lastname" onChange={this.hadlerChange}/>
                 <input className={s.inputStyle} type="text" placeholder="Отчество" id="patronymic" onChange={this.hadlerChange}/>
                 <input className={s.inputStyle} type="text" placeholder="Контактный номер" id="phone" onChange={this.hadlerChange}/>
                 <input className={s.inputAge} type="number" placeholder="Возраст" id="age" onChange={this.hadlerChange}/>
                 <Button onClick={this.addNewClient} >Добавить</Button>
            </form>
        </div>
        )
    }
}



const mapDispatchToProps=(dispatch) => {
    return {
        addClient: (newClient) => dispatch(addClient(newClient))
    }
  }
  

export default connect(null, mapDispatchToProps)(NewClient)