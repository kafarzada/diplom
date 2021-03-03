import React, { Component, useState } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { addClient } from '../../store/actions/clientActions'
import s from "./FormStyle.module.css"


class NewClient extends Component {
    
    // state = {
    //     firstname: '',
    //     lastname: '',
    //     patronymic: "",
    //     phone: "",
    //     age: '',
    //     cars: 0,
    //     scope: 0,
    //     registrationDate: new Date()
    // }


    onSubmit = (data) => {
        
        data.cars = 0;
        data.scope = 0
        data.registrationDate = new Date()
        this.addNewClient(data)
    }

    addNewClient = (data) => {
        this.props.addClient(data)
        this.props.history.goBack()
    }
    render() {
        return (
            <div>
                <h1>Новый Клиент</h1>
                <NewClientForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

const NewClientFormTemp = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>

                <div>
                    <Field component={'input'} name="firstname" placeholder="Фамилия" />
                </div>
                <div>
                    <Field component={'input'} name="lastname" placeholder="Имя" />
                </div>
                <div>
                    <Field component={'input'} name="patronymic" placeholder="Отчество" />
                </div>

                <div>
                    <Field component={'input'} name="age" placeholder="Возраст" />
                </div>


                <div>
                    <label>Пол</label>
                    <div>
                    <label>
                        <Field name="sex" component="input" type="radio" value="Мужчина" />{' '}
                        Мужчина
                    </label>
                    <label>
                        <Field name="sex" component="input" type="radio" value="Женщина" />{' '}
                        Женщина
                    </label>
                    <label>
                        <Field name="sex" component="input" type="radio" value="другое" />{' '}
                        Другое
                    </label>
                    </div>
                </div>

                <div>
                    <Field component={'input'} name="phone" placeholder="Номер Телефона" />
                </div>

                <Button type="submit">Добавить Клиента</Button>
                
            </form>
    )
}


const NewClientForm = reduxForm({
    form: "newClient"
})(NewClientFormTemp)



const mapDispatchToProps=(dispatch) => {
    return {
        addClient: (newClient) => dispatch(addClient(newClient))
    }
  }
  

export default connect(null, mapDispatchToProps)(NewClient)