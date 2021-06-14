
import React, { useState }  from 'react';
import { Button, FormText, Modal, Table } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import { firestoreConnect, useFirestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Form } from 'redux-form';


const Client = (props) => {
  useFirestoreConnect({collection: "client"})

  const clients = useSelector(state => state.firestore.ordered.client)


  return (
    <div>
        <div style={{display: "flex",marginBottom: "20px"}}>
          <input placeholder={"ФИО"}/><Button>Поиск</Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Количество Машин</th>
              <th>Бонус</th>
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
                      <td>{client.patronymic}</td>
                      <td>{client.cars}</td>
                      <td>{client.bonus}</td>
                    </tr>
                  )
                })
              }

          </tbody>
      </Table>
      
      <Link to="/newClient">
        <Button>Новый Клиент</Button>
      </Link>

    </div>
  )
};



export default compose()(Client)