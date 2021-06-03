import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addPlace, attach } from '../../store/actions/parkingActions';
import { Field, reduxForm } from 'redux-form'
import s from './Parking.module.css'
import { Link } from 'react-router-dom';

const Parking = (props) => {
        const {places} = props
        const [open, setOpen] = useState(true)
        const [placeId, setPlaceId] = useState()


        const addPlaceOnclick = () => {
            const LastNumber = places[places.length - 1].number
            props.addPlace(LastNumber + 1)
        }

        const openList = (e) => {
            setPlaceId(e.currentTarget.dataset.id)
            setOpen(!open)
        }

        const onSubmit = (data) => {
            data.placeId = placeId
            console.log(data)
            props.attach(data)
            setOpen(!open)
        }

    return (
        <div className={s.Parking}>
            <h2>Карта Стоянки</h2>
            {
                open ?
                <div className={s.Parking__inner}>
                {
                 places && places.map(item => {

                    if(item.isBusy && item.car) {
                        return (
                            <Link to={`/clientdetails/${item.car.userID}`}>
                                <div key={item.id} className={`${s.parkink__item}`}>
                                    <h4>{item.number}</h4>
                                    <div className={s.parking__model}>{item.car.marka}</div>
                                    <div className={s.parking__model}>{item.car.model}</div>
                                    <div className={s.parking__model}>{item.car.gosNumber}</div>
                                    {
                                        item.car.status ? <div>на месте</div> : <div>выехал</div> 
                                    }
                                </div>
                            </Link>
                        )
                    } else {
                        return (
                            <div className={`${s.parkink__item} ${!item.isBusy && s.open}`}>
                                {item.number}
                                <div data-id={item.id} onClick={openList}>Прикрепить транспорт</div>
                            </div>
                        )
                    }
                    }) 
                }

                <div className={s.Parking__item_add} onClick={() => {addPlaceOnclick()}}>
                    <div>Добавить</div>
                    <div>Новое место</div>
                </div>
            </div>
            :
            <>
                <div onClick={openList}>Назад</div>
                <h3>Прикрепить транспорт</h3>
                <NewForm onSubmit={onSubmit} cars={props.cars}/>
            </>
            }
        </div>
    );
};


const Form = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
        <div>
          <div>

            {
                props.cars ? 
                    props.cars.map(item => {
                        return (
                            <div key={item.id}>
                            <label>
                            <Field name="carId" component="input" type="radio" value={item.id}/>{' '}
                                {item.marka +  ": номер" + item.gosNumber }
                            </label>
                            </div>
                        )
                    })
                : null
            }
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>

        </div>
      </form>
    )
}

const NewForm = reduxForm({
    form: "newPlaceForCar"
})(Form)


const mapStateToProps = (state) => {
    let places = state.firestore.ordered.parking
    const cars = state.firestore.ordered.cars
    let p = []
    places && places.forEach(item => {
        let c = undefined
        cars && cars.forEach(car => {
            if(item.carId === car.id) {
                c = car
            } 
        })

        if(c != undefined) {
            p.push({...item, car: {...c}})
        } else {
            return p.push(item)
        }
    })

    return {
        places : p,
        cars: state.firestore.ordered.cars
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPlace: (number) => dispatch(addPlace(number)),
        attach: (data) => dispatch(attach(data))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "parking", orderBy: "number"},
        {collection: "cars"}
    ])
)(Parking);