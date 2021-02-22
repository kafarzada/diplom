
import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { removeClient } from '../../store/actions/clientActions'

const ClientDetails = (props) => {
    const {client} = props

    const onClickHandlerRemoveCLient = (id) => {
        
        props.removeClient(id)

    }
    if(client) {
        return (
            <div>
                <div>{client.firstname}</div>
                <div>{client.lastname}</div>
                <div>{client.patronomic}</div>
                <div>{client.phone}</div>
                <div>{client.cars}</div>
                <div>{client.scope}</div>
                <Button variant={'danger'} onClick={() => {onClickHandlerRemoveCLient(client.id)}}>Удалить Клиента</Button>
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