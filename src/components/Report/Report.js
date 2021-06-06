import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { getSubservices } from "../../store/actions/serviceActions";

const Report = (props) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const changeService = (e) => {
    props.getSubService(e.currentTarget.value);
  };

  const getShortText =(s)  =>{
      return    s.length > 40 ? s.substring(0, 40) + "..." : s
  }

  console.log(props.subService)
  return (
    <div> 
      <h1>Составление Отчетов</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth: "900px", margin: "0 auto"}}>
        <div style={{ display: "flex", justifyContent: "space-between",  marginBottom: "20px" }}>
          <div>
            <label>Начало</label>
            <input {...register('start_date')} type={"date"} />
          </div>

          <div>
            <label>Конец</label>
            <input {...register('end_date')} type={"date"} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <label>Тип Услуги</label>
            <select {...register('service')} onChange={changeService}>
                <option value="Все">Все</option>
              {props.services &&
                props.services.map((s, i) => {
                  return (
                    <option key={i} value={s.name}>
                      {s.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div>
            <label>Подтип Услуги</label>
            <select {...register('sub_service')}>
              {props.subService &&
                props.subService.map((s, i) => {
                  return <option key={i}>{getShortText(s.data.name)}</option>;
                })}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between",  marginBottom: "20px"  }}>
            <label>Фильт по сотрудником</label> 
            <select {...register('employee')}>
            <option value=""></option>
              {props.employees &&
                props.employees.map((e, i) => {
                  return <option value={e.id} key={i}>{`${e.firstname} ${e.lastname}`}</option>;
                })}
            </select>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end",  marginBottom: "20px"  }}>
            <Button type="submit">Вывести отчет</Button>
        </div>
      </form>
    </div>
  );
};

export default compose(
  connect(
    (state) => {
      return {
        services: state.firestore.ordered.services,
        employees: state.firestore.ordered.employees,
        subService: state.serviceReducer.services
      };
    },
    (dispatch) => {
      return {
        getSubService: (name) => dispatch(getSubservices(name)),
      };
    }
  ),
  firestoreConnect([{ collection: "services" }, {collection: "employees"}])
)(Report);
