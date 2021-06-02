import React from "react";
import { Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { removeOrder } from "../../store/actions/autoWashActions";
import OwnTable from "../layout/OwnTable";

const AutoWash = (props) => {
  const orders = props.orders;
  console.log(orders);
  return (
    <div style={{margin: "0.5em"}}>
      <h1>Заявки</h1>
      {orders &&
        orders.map((order, index) => (
          <Link to={"/orderDetails/" + order.id}>
            <div className={"order"}>
              <div>
                <div>Заявка {index + 1}</div>
                <div>Дата Создание {order.order_date}</div>
                <div>Статус: {order.status}</div>
              </div>
              <div>
                <Button
                  onClick={() => props.removeOrder(order.id)}
                  variant={"outline-danger"}
                >
                  Удалить
                </Button>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.firestore.ordered.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeOrder: (orderId) => dispatch(removeOrder(orderId)),
  };
};

export default compose(
  firestoreConnect([{ collection: "orders" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(AutoWash);
