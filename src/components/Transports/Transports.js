import moment from "moment";
import React from "react";
import { Table } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { connect, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useFirebaseConnect, useFirestoreConnect } from "react-redux-firebase";
import { removeCar } from "../../store/actions/clientActions";

function Transports(props) {
  useFirestoreConnect({ collection: "cars" });
  const cars = useSelector((state) => {
    return state.firestore.ordered.cars;
  });

  console.log(cars);
  return (
    <div>
      <h1>Транспортные средства</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Марка</th>
            <th>Модель</th>
            <th>Номер Траспорта</th>
            <th>Время Заезда</th>
            <th>Время выезда</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars
            ? cars.map((car, i) => {
                const dateEntry = moment.unix(car.timeOfEntry).format("ss:mm:hh:MM/DD/YYYY");
                return <tr key={car.id}>
                    <td>{i + 1}</td>
                    <td><Link to={"/clientdetails/"+car.userID}>{car.marka}</Link></td>
                    <td>{car.model}</td>
                    <td>{car.gosNumber}</td>
                    <td>{dateEntry}</td>
                    <td>{moment.unix(car.checkOutTime).format("ss:mm:hh:MM/DD/YYYY")}</td>
                    <td><Button onClick={() => props.removeCar(car.id, car.userID)}>Удалить</Button>  </td>
                </tr>;
              })
            : null}
        </tbody>
      </Table>
    </div>
  );
}

export default connect(null, (dispatch) => {
  return {
    removeCar: (carId, userId) => dispatch(removeCar(carId, userId))
  }
})(Transports);
