import React, { useState } from "react";
import { Cast } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

function NewOrder() {
  const [selectedClient, setSelectedClient] = useState();
  const [selectedEmployee, setEmployee] = useState([]);
  const [selectedCars, setSelectedCars] = useState();
  const [selectedService, setSelectedService] = useState([])
  const { handleSubmit, register, errors } = useForm();
  const [userCars, setUserCars] = useState([]);

  useFirestoreConnect([
    { collection: "client" },
    { collection: "cars" },
    { collection: "employees" },
    { collection: "services/rggQUehfahL1LFQGS17R/autowathServices"}
  ]);
  const clients = useSelector((state) => state.firestore.ordered.client);
  const cars = useSelector((state) => state.firestore.ordered.cars);
  const services = useSelector(state => state.firestore.ordered["services/rggQUehfahL1LFQGS17R/autowathServices"])
  console.log(services)
  console.log(clients);
  console.log(cars);
  const selectClientHandler = (e) => {
    const userId = e.currentTarget.value;

    setUserCars(cars.filter((car) => car.userID == userId));
  };

  const selectCarsHandler = (e) => {

  }

  return (
    <div>
      <h1>Новая Заявка</h1>
      <div>
        Выберите Клиента:
        <select onChange={selectClientHandler}>
          <opttion value={" "}> </opttion>
          {clients &&
            clients.map((client, i) => (
              <option
                value={client.id}
              >{`${client.firstname} ${client.lastname}`}</option>
            ))}
        </select>
      </div>
      <div>
        Выберите Траспортное средство:
        <select onChange={selectCarsHandler} multiple={"multiple"}>
          {userCars &&
            userCars.map((car, i) => (
              <option>{`${car.marka} ${car.model}`}</option>
            ))}
        </select>
      </div>
      <div>
        выберите услуги
        <select  multiple={"multiple"} style={{height: "600px"}}>
                {
                   services && services.map((s, i) => <option value={s.id}>{s.name}</option>) 
                }
        </select>
      </div>
      
    </div>
  );
}

export default NewOrder;
