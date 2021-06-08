import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";
import { firestoreConnect, useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";
import * as Icon from "react-bootstrap-icons";
import {
  addService,
  changePrice,
  removeService,
  sortedService,
} from "../../store/actions/serviceActions";
import { Button } from "react-bootstrap";

const Service = (props) => {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const [service, setService] = useState({});

  const onSubmit = (data) => {
    props.addService(data.name, Number(data.price));
    setOpen(false);
  };

  useFirestoreConnect(['services'])
  const  s = useSelector(state => state.firestore.data.service)
  console.log(s);

  return (
    <div>
      <h2>Услуги Автомойки</h2>
      {open ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder={"Название"} />
          <input {...register("price")} placeholder={"Цена"} />
          <Button type="submit">Добавить</Button>
        </form>
      ) : null}
      <Button onClick={() => setOpen(!open)}>{open ? "-" : "+"}</Button>
      {edit ? (
        <>
          <EditService
            service={service}
            close={setEdit}
            changePrice={props.changePrice}
            remove={props.remove}
          />
        </>
      ) : (
        <>
          <div>
            {props.autoWashServices &&
              props.autoWashServices.map((s) => {
                return (
                  <div
                    onClick={() => {
                      setService(s);
                      setEdit(true);
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "900px",
                    }}
                  >
                    <Link>{s.name}</Link>
                    <div>{s.price + " руб."}</div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

function EditService({ service, close, changePrice, remove }) {
  const [price, setPrice] = useState(service.price);
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (data) => {
    changePrice(service.id, Number(data.price));
    close(false);
  };
  const removehandler = () => {
    remove(service.id);
    close(false);
  };
  return (
    <div
      style={{
        boxShadow: "0px 0px 10px rgb(189, 179, 221)",
        maxWidth: "600px",
        padding: "20px",
        borderRadius: "10px"
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Название Услуги: {service.name}</div>
        <label>Цена</label>
        <input
          {...register("price")}
          value={price}
          onChange={(e) => setPrice(e.currentTarget.value)}
        />
        <Button variant={"outline-danger"} onClick={() => close(false)}>
          Отменить
        </Button>
        <Button variant={"outline-primary"} type={"submit"}>
          Сохранить
        </Button>
      </form>
      <Button variant={"danger"} onClick={removehandler}>
        Удалить Услугу
      </Button>
    </div>
  );
}

export default compose(
  firestoreConnect([
    { collection: "services/rggQUehfahL1LFQGS17R/autowathServices" },
  ]),
  connect(
    (state) => {
      return {
        autoWashServices:
          state.firestore.ordered[
            "services/rggQUehfahL1LFQGS17R/autowathServices"
          ],
      };
    },
    (dispatch) => {
      return {
        changePrice: (id, price) => dispatch(changePrice(id, price)),
        remove: (id) => dispatch(removeService(id)),
        sort: () => dispatch(sortedService()),
        addService: (name, price) => dispatch(addService(name, price)),
      };
    }
  )
)(Service);
