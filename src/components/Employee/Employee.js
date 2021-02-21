
import React from 'react'
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Employee = () => {
  const [modalShow, setModalShow] = React.useState(false);
    return (
      <div>
            <Row>
                <Col><Button onClick={() => setModalShow(true)}>Добавить Сотрудника</Button></Col>
            </Row>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
      </div>
              
    )
}
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Новый Сотрудник
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>ДАнные сотрудника</h4>
        <Form>
          <Form.Group controlId="formGroupName">
            <Form.Label>Имя</Form.Label>
            <Form.Control type="text" placeholder="Имя" />
          </Form.Group>
          <Form.Group controlId="formGroupLastName">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control type="text" placeholder="Фамилия" />
          </Form.Group>
          <Form.Group controlId="formGrouppatronic">
            <Form.Label>Отчество</Form.Label>
            <Form.Control type="text" placeholder="Отчество" />
          </Form.Group>
          <Form.Group controlId="formGroupPhone">
            <Form.Label>Контактный Номер</Form.Label>
            <Form.Control type="text" placeholder="Контактный Номер" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-secondary"} onClick={props.onHide}>Закрыть</Button>
        <Button variant="primary" type="submit" onClick={props.onHide}>Создать</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Employee