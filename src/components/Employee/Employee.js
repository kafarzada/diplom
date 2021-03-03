
import React, { Component } from 'react'
import { Button, Col, Modal, Row, Spinner, Table } from 'react-bootstrap'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { addEmployee } from '../../store/actions/employeeActions';

const Employee = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const {employees} = props
  const {positions} = props

    const employeesList = employees && employees.map((employe, index) => {
        return (
          <tr key={employe.id}>
            {
              <>
              <td>{index + 1}</td>
              <td><Link to={"/employeedetails/" + employe.id}>{employe.firstname}</Link></td>
              <td>{employe.lastname}</td>
              <td>{employe.patronymic}</td>
              <td>{employe.phone}</td>
              </>
            }
          </tr>
        )
    })

    return (
      <div>
            <Row>
                <Col><Button onClick={() => setModalShow(true)}>Добавить Сотрудника</Button></Col>
            </Row>
            <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Фамилия</th>
                  <th>Имя</th>
                  <th>Отчество</th>
                  <th>Контактный Номер</th>
                </tr>
              </thead>
              <tbody>
                {
                  employeesList
                }
              </tbody>
            </Table>
            </Row>
            <NewMyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              positions={positions}
            />
      </div>
              
    )
}
class  MyVerticallyCenteredModal extends Component {
  state = {
    firstName: '',
    lastName: '',
    patronymic: "",
    phone: "",
  }

  handlerSubmit = (e) => {
    e.preventDefault()
    this.props.addEmployee(this.state)

  }

  hadlerChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }


  render() {

    
    if(this.props.positions) {
      console.log(this.props.positions)
    }


    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Новый Сотрудник
          </Modal.Title>
        </Modal.Header>
          <h4>ДАнные сотрудника</h4>
          <form onSubmit={this.handlerSubmit}>
            <Modal.Body>
                <div>
                  <input type="text" placeholder="Фамилия" id="firstName" onChange={this.hadlerChange}/>
                </div>
                <div>
                  <input type="text" placeholder="Имя" id="lastName" onChange={this.hadlerChange}/>
                </div>
                <div>
                  <input type="text" placeholder="Отчество" id="patronymic" onChange={this.hadlerChange}/>
                </div>

                <div>
                  <input type="text" placeholder="Контактный номер" id="phone" onChange={this.hadlerChange}/>
                </div>
                <div>

                </div>
             </Modal.Body>
            <Modal.Footer>
              <Button variant={"outline-secondary"} onClick={this.props.onHide}>Закрыть</Button>
              <Button variant="primary" type="submit" onClick={this.props.onHide}>Создать</Button>
            </Modal.Footer>
          </form>
        

      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    positions: state.firestore.ordered.position
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEmployee: (employee) => dispatch(addEmployee(employee))
  }
}
const NewMyVerticallyCenteredModal = compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: "position"}
  ])
)(MyVerticallyCenteredModal)



const mapStateToPropsForEmploye = (state) => {
  return {
    employees: state.firestore.ordered.employees,
  }
}

export default compose(
  connect(mapStateToPropsForEmploye),
  firestoreConnect([
    {collection: "employees"}
  ])
)(Employee)