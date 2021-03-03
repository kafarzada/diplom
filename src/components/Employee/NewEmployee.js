import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { addEmployee } from '../../store/actions/employeeActions'
import s from "../Client/FormStyle.module.css"

class NewEmployee extends Component {

    onSubmit = (data) => {
        console.log(data)
        this.props.addEmployee(data)
    }


    render() {

        const positionOptions = this.props.positions && 
                                this.props.positions.map(position => {
                                    return <option value={position.position} name={position.position} key={position.id}>{position.position}</option>
                                })
        return(
            <div>
                <h1 className={s.formTitle}>Новый Сотрудник</h1>
                <NewEmployeeForm onSubmit={this.onSubmit} positionOptions={positionOptions}/>
            </div>
        )
    }
}

const NewEmployeTemp = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit} className={s.formContaienr}>
            <div>
                <Field name={"firstname"} component={'input'} type="text" placeholder="Фамилия" className={s.inputStyle}></Field>
            </div>
            <div>
                <Field name={"lastname"} component={'input'} type="text" placeholder="Имя" className={s.inputStyle}></Field>
            </div>
            <div>
                <Field name={"patronymic"} component={'input'} type="text" placeholder="Отчество" className={s.inputStyle}></Field>
            </div>
            <div>
                <label>Выберите должность:  </label>
                <Field name={"position"} component={'select'} type="text">
                    {props.positionOptions}
                </Field>
            </div>
            <div>
                <Field name={"phone"} component={'input'} type="text"></Field>
            </div>

            <div><Button type="submit">Добавить Сотрудника</Button></div>
        </form>
    )
}


const NewEmployeeForm = reduxForm({
    form: "newEmployee"
})(NewEmployeTemp)

const mapStateToProps = (state) => {
    return {
        positions: state.firestore.ordered.position
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addEmployee: (newEmploye) => dispatch(addEmployee(newEmploye))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "position" }
    ])
)(NewEmployee)