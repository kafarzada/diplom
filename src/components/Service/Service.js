import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";
import * as Icon from "react-bootstrap-icons";
import { changePrice, removeService, sortedService } from "../../store/actions/serviceActions";

const Service = (props) => {
  const [edit, setEdit] = useState(false);
  const [service, setService] = useState({});

  return (
    <div>
      <h2>Услуги Автомойки</h2>
      {edit ? (
        <>
          <EditService service={service} close={setEdit} changePrice={props.changePrice} remove={props.remove}/>
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
                        display:'flex',
                        justifyContent: "space-between",
                        maxWidth: "900px"
                    }}
                  >
                    <Link>{s.name}</Link>
                    <div>{s.price}</div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

function EditService({ service, close,changePrice,remove }) {
  const [price, setPrice] = useState(service.price);
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (data) => {
    changePrice(service.id, Number(data.price))
    close(false)
  };
  const removehandler = () => {
    remove(service.id)
    close(false)
  }
  return (
      <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>{service.name}</div>
      <input
        {...register("price")}
        value={price}
        onChange={(e) => setPrice(e.currentTarget.value)}
      />
      <button onClick={() => close(false)}>Отменить</button>
      <button type={"submit"}>Сохранить</button>
    </form>
    <button onClick={removehandler}>Удалить</button>
    </>
  );
}

export default compose(
  firestoreConnect([
    { collection: "services/rggQUehfahL1LFQGS17R/autowathServices" },
  ]),
  connect(
    (state) => {
      console.log(state.firestore);
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
          sort: () => dispatch(sortedService())
      };
    }
  )
)(Service);
