import moment from "moment";
import React from "react";
import { Table } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";

const History = (props) => {
  console.log(props.histories);
  const historyList =
    props.histories &&
    props.histories.map((history, i) => (
      <tr key={history.id}>
        <td>{i + 1}</td>
        <td>{new Date(history.date_closed * 1000).toUTCString()}</td>
        <td><Link to={"/clientdetails/" +history.clientId} >{history.clientId}</Link></td>
        <td>{history.totalPrice}</td>
        <td>{history.tranzaction}</td>
      </tr>
    ));
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Дата Оплаты</th>
            <th>ФИО Клиента</th>
            <th>Сумма</th>
            <th>Номер транзакции</th>
          </tr>
        </thead>
        <tbody>{historyList}</tbody>
      </Table>
    </div>
  );
};

export default compose(
  firestoreConnect([
    { collection: "history", orderBy: ["date_closed", "desc"] },
  ]),
  connect((state) => {
    return {
      histories: state.firestore.ordered.history,
    };
  })
)(History);
