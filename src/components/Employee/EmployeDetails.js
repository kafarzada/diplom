import React from "react";
import s from "./EmployeeDetails.module.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { removeEmployee } from "../../store/actions/employeeActions";
import { Button, Spinner } from "react-bootstrap";
import moment from "moment";

const EmployeeDetails = (props) => {
  const { employee } = props;
  console.log(employee);
  const onClickHandlerDelete = (id) => {
    props.removeEmployee(id);
    props.history.goBack();
  };

  if (employee) {
    return (
      <div className={s.employee__details}>
        <div className={s.employee__image}>
          <div className={s.empImg}></div>
        </div>
        <div className={s.employee__info}>
          <ul>
            <li className={s.info__item}>
              {" "}
              <span>Имя:</span>
              {employee.firstname}
            </li>
            <li className={s.info__item}>
              {" "}
              <span>Фамилия:</span>
              {employee.lastname}
            </li>
            <li className={s.info__item}>
              {" "}
              <span>Отчество:</span>
              {employee.patronymic}
            </li>
            <li className={s.info__item}>
              {" "}
              <span>Контактный номер:</span>
              {employee.phone}
            </li>
            <li className={s.info__item}>
              {" "}
              <span>Должность:</span>
              {employee.position}
            </li>
            <li className={s.info__item}>
              {" "}
              <span>Работает с:</span>
              {moment(employee.startAt.toDate().toString()).calendar()}
            </li>
            <li className={s.info__item}>
              {" "}
              <span>Количество выполненых Заявок:</span>
              {employee.orderCount}
            </li>
          </ul>
          <div className={s.employe_delete_row}>
            <Button
              onClick={() => {
                onClickHandlerDelete(props.id);
              }}
              variant={"danger"}
            >
              Удалить сотрудника
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const employees = state.firestore.data.employees;
  const employee = employees ? employees[id] : null;
  return {
    employee: employee,
    id: id,
  };
};

const matDispatchtoProps = (dispatch) => {
  return {
    removeEmployee: (id) => dispatch(removeEmployee(id)),
  };
};

export default compose(
  connect(mapStateToProps, matDispatchtoProps),
  firestoreConnect([{ collection: "employees" }])
)(EmployeeDetails);
