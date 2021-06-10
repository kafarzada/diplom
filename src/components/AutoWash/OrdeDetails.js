import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";
import {
  chooseEmployee,
  closeOrder,
  removeOrder,
} from "../../store/actions/autoWashActions";

const OrderDetail = (props) => {
  const order = props.order;
  const client = props.client;
  console.log(order);
  const [openEmployeeList, setOpenEmployeeList] = useState(false);
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, errors } = useForm();

  const removeOrder = (id) => {
    props.removeOrder(id);
  };

  const onSubmit = (data) => {
    props.chooseEmployee(props.id, data.employees);
    setOpenEmployeeList(true);
  };

  return (
    <>
      {order && (
        <div className={"orderDetailContainer"}>
          <h1>Заявка</h1>
          <div>
            <div style={{ marginBottom: "20px" }}>
              <div>Дата Создание {order.order_date}</div>
              <div>Статус: {order.status}</div>
              <div>{order.paided} <Button>Оплатить Наличными</Button></div>
              {/* <div>Создал: {client&& client.firstname}</div> */}
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h5>Обслуживаемые транспорты:</h5>
              <div>
                {order.cars &&
                  order.cars.map((car) => (
                    <div className={"tab"}>
                      <div>Марка: {car.marka}</div>
                      <div>Номер транспорта: {car.gosNumber}</div>
                    </div>
                  ))}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h5>Услуги:</h5>
              <div>
                {order.services &&
                  order.services.map((s) => (
                    <div className={"tab"}>
                      <div>{s.name}</div>
                    </div>
                  ))}
              </div>
            </div>

            {
              order.status != "Выполнено"? 
              <div style={{ marginBottom: "20px" }}>
              <h5>Выберите Автомойщиков:</h5>
              <Button
                variant={"outline-secondary"}
                onClick={() => {
                  setOpenEmployeeList(!openEmployeeList);
                }}
              >
                {!openEmployeeList ? "+" : "-"}
              </Button>
              {openEmployeeList ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  {props.employees && props.employees.length == 0 ? (
                    <div style={{ color: "red" }}>Все сотруднинки заняты</div>
                  ) : (
                    <>
                      <select multiple="multiple" {...register("employees")}>
                        {props.employees &&
                          props.employees.map((e) => (
                            <option
                              key={e.id}
                              value={e.id}
                            >{`${e.firstname} ${e.lastname}`}</option>
                          ))}
                      </select>
                      <input type={"submit"} value={"Назвначить"} />
                    </>
                  )}
                </form>
              ) : null}
            </div>: null
            }

            <div>
              {order.employees &&
                order.employees.map((e) => {
                  return (
                    <Link
                      to={"/employeedetails/" + e.id}
                    >{`${e.firstname} ${e.lastname}`}</Link>
                  );
                })}
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                maxWidth: "300px",
                justifyContent: "space-between",
              }}
            >
              {
                order.status != "Выполнено" ? 
                <>
                <Button onClick={() => props.closeOrder(props.id) }>Закрыть Заявку</Button>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeOrder(props.id)}
                >
                  Удалить
                </Button></> : null
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.orderId;
  const orders = state.firestore.data.orders;
  const order = orders ? orders[id] : null;

  const users = state.firestore.data.client;
  const client = users ? users[orders.client] : null;

  return {
    order,
    id,
    client,
    employees: state.firestore.ordered.employees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeOrder: (orderId) => dispatch(closeOrder(orderId)),
    removeOrder: (orderId) => dispatch(removeOrder(orderId)),
    chooseEmployee: (orderId, employeesId) =>
      dispatch(chooseEmployee(orderId, employeesId)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "orders", orderBy: ["order_date", "desc"] },
    { collection: "client" },
    {
      collection: "employees",
      where: [
        ["status", "==", false],
        ["position", "==", "Автомойщик"],
      ],
    },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(OrderDetail);
