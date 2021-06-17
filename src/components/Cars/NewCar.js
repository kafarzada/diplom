import React, { Component } from "react"
import { Button, Spinner } from "react-bootstrap"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { compose } from "redux"
import { Field, reduxForm } from "redux-form"
import { getModels } from "../../store/actions/carActions"
import { addCar } from "../../store/actions/clientActions"
import s from "../Client/FormStyle.module.css"

class NewCar extends Component {


    onChangeSelectBrand = (e) => {
        const id = e.currentTarget.selectedOptions[0].dataset.id
        
        this.props.getModels(id)
    }

    onChangeSelectModel = (e) => {

    }

    onSubmit = (formData) => {
        formData.userId=this.props.userId
        this.props.addNewCar(formData)
        this.props.history.goBack();
    }



    render() {
        if(this.props.brands) {

            const bradsOprions = this.props.brands ?
                                this.props.brands.map(brand => {
                                    return <option data-id={brand.id}  value={brand.marka} key={brand.id}>{brand.marka}</option>
                                })
                                : null

            const modelsOptions = this.props.models ? 
                                this.props.models.map(model => {
                                    return <option data-id={model.id}  value={model.marka} key={model.id}>{model.model}</option>
                                }) : null


            return (
                <div className={s.formContaienr}> 
                    <h1 className={s.formTitle}>Новый Транспорт</h1>
                    <NewCarForm onChangeSelectBrand={this.onChangeSelectBrand} bradsOprions={bradsOprions} onSubmit={this.onSubmit} models={modelsOptions}/>
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
}

const NewCarF = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className={s.selectLabel}>Выберите Макру:</div>
                <Field component="select" onChange={props.onChangeSelectBrand} name="marka" className={s.selectForm}>
                    <option></option>
                    {props.bradsOprions} 
                </Field>

            </div>
            <div>
                <div className={s.selectLabel}>Выберите Модель</div>
                <Field component="select"  placeholder="Выбрерите модель" name="model" className={s.selectForm}>
                    <option></option>
                    {props.models}
                </Field>

            </div>
            <div>
                
            </div>
            <Field component="input" placeholder="укажите номера транспорта" name="gosNumber"  className={s.inputStyle} />


            <Button type="submit">Добавить Транспорт</Button> 
        </form> 
    )
}

const NewCarForm = reduxForm({
    form: "newCar"
})(NewCarF)




const mapStateToProps = (state, ownProps) => {
    return {
        brands: state.firestore.ordered.marka,
        userId: ownProps.match.params.userId,
        models: state.car.models
    }
}

const mapDispatchToProps = (dispatch) => {
     return {
        getModels: (id) => dispatch(getModels(id)),
        addNewCar: (data) => dispatch(addCar(data))
      }
}




export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: "marka"}
    ])
)(NewCar)