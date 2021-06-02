import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { removeOrder } from "../../store/actions/autoWashActions";


const OrderDetail = (props) => {

    const order = props.order
    const client = props.client

    const removeOrder = (id) => {
        props.removeOrder(id)
    }

  return (
    <div className={"orderDetailContainer"}>
        <h1>Заявка</h1>
        <div>
            <div>Дата Создание {order.order_date}</div>
            <div>Статус: {order.status}</div>
            <h5>Обслуживаемые транспорты:</h5>
            <div>
                {
                  order.cars && order.cars.map(car => (
                      <div className={"tab"}>
                        <div>Марка: {car.marka}</div>
                        <div>Номер транспорта: {car.gosNumber}</div>
                      </div>
                  ))      
                }
            </div>

            <h5>Услуги:</h5>
            <div>
                {
                  order.services && order.services.map(s => (
                      <div className={"tab"}>
                        <div>{s.name}</div>
                      </div>
                  ))      
                }
            </div>

            <div style={{marginTop:"20px",display:"flex", maxWidth:"300px", justifyContent:"space-between"}}>
                <Button >Закрыть Заявку</Button>
                <Button  variant={"outline-danger"} onClick={() => removeOrder(props.id)}>Удалить</Button>
            </div>
        </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.orderId
    const orders = state.firestore.data.orders
    const order = orders ? orders[id]: null
    
    const users = state.firestore.data.client
    const client = users ? users[orders.client] : null
    
    return {
        order,
        id,
        client
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeOrder: (orderId) => dispatch(removeOrder(orderId))
    }
}


export default compose(
    firestoreConnect([
        {collection: "orders", orderBy: ["order_date", "desc"]},
        {collection: "client"}
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(OrderDetail)