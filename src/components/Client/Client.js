
import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import OwnTable from '../layout/OwnTable';

const Client = (props) => {

  const {clients} = props
  

  return (
    <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Количество Машин</th>
            </tr>
          </thead>
          <tbody>

              {
                clients && clients.map((client, index) => {
                  
                  return(
                    <tr key={client.id}>
                      <td>{index + 1}</td>
                      <td><Link to={'/clientdetails/' + client.id}>{client.firstname}</Link> </td>
                      <td>{client.lastname}</td>
                      <td>{client.patronomic}</td>
                      <td>{client.cars}</td>
                    </tr>
                  )
                })
              }

          </tbody>
      </Table>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    clients: state.firestore.ordered.client
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: "client"}
  ])
)(Client)