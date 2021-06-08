import React, { Component } from "react";
import { Button, Col, Modal, Row, Spinner, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { addEmployee } from "../../store/actions/employeeActions";

const Employee = (props) => {
  const { employees } = props;
  const { positions } = props;

  const employeesList =
    employees &&
    employees.map((employe, index) => {
      return (
        <tr key={employe.id}>
          {
            <>
              <td>{index + 1}</td>
             <td>
                <Link to={"/employeedetails/" + employe.id}>
                  {employe.firstname}
                </Link>
              </td>
              <td>{employe.lastname}</td>
              <td>{employe.patronymic}</td>
              <td>{employe.position}</td>
              <td>{employe.phone}</td>
              <td>{employe.status ? "занят" : "свободен"}</td>
              <td>{employe.orderCount}</td>
            </>
          }
        </tr>
      );
    });

  return (
    <div>
      <Row>
        <Col>
          {" "}
          <Link to="newemployee">
            <Button>Добавить Сотрудника</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Должность</th>
              <th>Контактный Номер</th>
              <th>Статус</th>
              <th>Всего заявок</th>
            </tr>
          </thead>

          <tbody>{employeesList}</tbody>
        </Table>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEmployee: (employee) => dispatch(addEmployee(employee)),
  };
};

const mapStateToPropsForEmploye = (state) => {
  return {
    employees: state.firestore.ordered.employees,
  };
};

export default compose(
  connect(mapStateToPropsForEmploye),
  firestoreConnect([
    { collection: "employees", orderBy: ["orderCount", "desc"] },
  ])
)(Employee);
