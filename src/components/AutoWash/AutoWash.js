import moment from "moment";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { firestoreConnect, useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { removeOrder } from "../../store/actions/autoWashActions";

const AutoWash = (props) => {

  useFirestoreConnect([
    {collection: "orders", orderBy: ["order_date", "desc"], }
  ])



  const o = useSelector(state => state.firestore.ordered.orders)
  const [orders, setOrders] = useState(o)
  console.log(o);
  console.log(orders);

  const getStyle = (paided) => {
    return {
      color: paided != "Оплачено" ? "red" : "#007bff"
    }
  }

  const changeHandler = (e) => {

    if(e.currentTarget.value == "") {
      setOrders(o)
      return;
    }



    if(e.currentTarget.value == "В ожидании") {
        setOrders(o.filter(i => i.status == e.currentTarget.value))
        return;

    }

    if(e.currentTarget.value == "Выполнено") {
      setOrders(o.filter(i => i.status == e.currentTarget.value))
      return;
    }

    if(e.currentTarget.value == "Не оплачено") {
      setOrders(o.filter(i => i.paided == e.currentTarget.value))
      return;
    }
  }
  return (
    <div style={{margin: "0.5em"}}>
      <h1>Заявки</h1>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <select onChange={changeHandler}>
          <option value={""}>Все</option>
          <option value={"В ожидании"}>Не Закрытые</option>
          <option value={"Выполнено"}>Закрытые</option>
          <option value={"Не оплачено"}>Не оплаченные</option>
        </select>
        <Button>Новая Заявка</Button>
      </div>

      {
        orders.length == 0 ? <div style={{margin: "20px", color: "red"}}>Пусто</div> : null
      }
      {orders &&
        orders.map((order, index) => (
          <Link to={"/orderDetails/" + order.id}>
            <div className={"order"}>
              <div>
                <div>Заявка {index + 1}</div>
                <div>Дата Создание {order.order_date}</div>
                <div>Сумма: {order.totalPrice + " руб"}</div>
                <div style={getStyle(order.paided)}>{order.paided}</div>
                {order.date_closed && `Дата Закрыте: ${new Date(order.date_closed * 1000)}`}
                <div>Статус: {order.status}</div>
              </div>
              <div>
                {
                  order.status != "Выполнено" ?
                  <Button
                  onClick={() => props.removeOrder(order.id)}
                  variant={"outline-danger"}
                >
                  Удалить
                </Button> : null
                }
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};



const mapDispatchToProps = (dispatch) => {
  return {
    removeOrder: (orderId) => dispatch(removeOrder(orderId)),
  };
};

export default compose(
  connect(null, mapDispatchToProps)
)(AutoWash);
