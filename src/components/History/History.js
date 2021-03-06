import moment from "moment";
import React from "react";
import { Table, ThemeProvider } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { firestoreConnect, useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";

const History = (props) => {
  useFirestoreConnect([
    { collection: "history", orderBy: ["date_closed", "desc"] },
    { collection: "client" },
  ]);
  const histories = useSelector((state) => state.firestore.ordered.history);
  const clients = useSelector((state) => state.firestore.ordered.client);
  let tmp = [];
  console.log(clients);

  const historyList =
    histories &&
    histories.map((history, i) => (
      <tr key={history.id}>
        <td>{i + 1}</td>
        <td>{new Date(history.date_closed * 1000).toUTCString()}</td>
        <td>
          <Link to={"/clientdetails/" + history.clientId}>
            {history.clientId}
          </Link>
        </td>
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

export default compose()(History);
