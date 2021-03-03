
import React, { Component } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { addClient } from '../../store/actions/clientActions';
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
      
      <Link to="/newClient">
        <Button>Новый Клиент</Button>
      </Link>

    </div>
  )
};

// class  MyVerticallyCenteredModal extends Component {
//   state = {
//     firstname: '',
//     lastname: '',
//     patronymic: "",
//     phone: "",
//     age: ''
//   }

//   handlerSubmit = (e) => {
//     e.preventDefault()
//     this.props.addClient(this.state)

//   }

//   hadlerChange = (e) => {
//     this.setState({
//       [e.target.id]: e.target.value
//     })
//   }


//   render() {


//     return (
//       <Modal
//         {...this.props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Новый Клиент
//           </Modal.Title>
//         </Modal.Header>
//           <h4>Данные Клиента</h4>
//           <form onSubmit={this.handlerSubmit}>
//             <Modal.Body>
//                 <div>
//                   <input type="text" placeholder="Фамилия" id="firstname" onChange={this.hadlerChange}/>
//                 </div>
//                 <div>
//                   <input type="text" placeholder="Имя" id="lastname" onChange={this.hadlerChange}/>
//                 </div>
//                 <div>
//                   <input type="text" placeholder="Отчество" id="patronymic" onChange={this.hadlerChange}/>
//                 </div>

//                 <div>
//                   <input type="text" placeholder="Контактный номер" id="phone" onChange={this.hadlerChange}/>
//                 </div>
//                 <div>
//                 <input type="number" placeholder="Возраст" id="age" onChange={this.hadlerChange}/>
//                 </div>
//              </Modal.Body>
//             <Modal.Footer>
//               <Button variant={"outline-secondary"} onClick={this.props.onHide}>Закрыть</Button>
//               <Button variant="primary" type="submit" onClick={this.props.onHide}>Создать</Button>
//             </Modal.Footer>
//           </form>
        

//       </Modal>
//     );
//   }
// }






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