
import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { removeClient } from '../../store/actions/clientActions'

const ClientDetails = (props) => {
    const {client, id} = props

    const onClickHandlerRemoveCLient = (id) => {
        
        props.removeClient(id)
        props.history.goBack()
    }
    if(client && id) {
        return (
            <div>
               <div>
                    <div>{client.firstname}</div>
                    <div>{client.lastname}</div>
                    <div>{client.patronymic}</div>
                    <div>{client.phone}</div>
                    <div>{client.cars} <Link to={"/newCar/" + id}> <Button variant="outline-secondary" size="sm">Добавить Транспорт</Button></Link></div>
                    <div>{client.scope}</div>
                    <Button variant={'danger'} onClick={() => {onClickHandlerRemoveCLient(id)}}>Удалить Клиента</Button>
               </div>
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


const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const clients = state.firestore.data.client
    const client = clients ? clients[id]: null
    return {    
        id,
        client
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeClient: (id) => dispatch(removeClient(id))
    }
}   

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: "client"}
    ])
)(ClientDetails)