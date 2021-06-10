import moment from "moment";
import React from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createReport } from "../../store/actions/reportAction";
import { getSubservices } from "../../store/actions/serviceActions";

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const Report = (props) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (data) => {
    props.createReport(data);
  };

  const changeService = (e) => {
    props.getSubService(e.currentTarget.value);
  };

  const getShortText = (s) => {
    return s.length > 40 ? s.substring(0, 40) + "..." : s;
  };

 function onclickHandler() {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      
        const ws = XLSX.utils.json_to_sheet(props.orders);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, "отчет" + fileExtension);
 
  }
  return (
    <div>
      <h1>Составление Отчетов</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <label>Начало</label>
            <input {...register("start_date")} type={"date"} />
          </div>

          <div>
            <label>Конец</label>
            <input {...register("end_date")} type={"date"} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <label>Тип Услуги</label>
            <select {...register("service")} onChange={changeService}>
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
            <select {...register("sub_service")}>
              {props.subService &&
                props.subService.map((s, i) => {
                  return <option key={i}>{getShortText(s.data.name)}</option>;
                })}
            </select>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <label>Фильт по сотрудником</label>
          <select {...register("employee")}>
            <option value=""></option>
            {props.employees &&
              props.employees.map((e, i) => {
                return (
                  <option
                    value={e.id}
                    key={i}
                  >{`${e.firstname} ${e.lastname}`}</option>
                );
              })}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Button type="submit">Готова</Button>
        </div>
      </form>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Дата создание</th>
              <th>Услуга</th>
              <th>Услуги</th>
              <th>Дата Закрытие</th>
              <th>Сотрудник</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {props.orders &&
              props.orders.map((o, i) => {
                return (
                  <tr key={i}>
                    {
                      <>
                        <td>{i + 1}</td>
                        <td>{o.order_date}</td>
                        <td>{o.type}</td>
                        <td>
                          {o.services.map((s) => (
                            <div>{s.name}</div>
                          ))}{" "}
                        </td>
                        {/* <td>{moment(o.date_closed.toDate().toString())}</td> */}
                        <td>{o.date_closed.toDate().toDateString()}</td>
                        <td>{o.employees.map((emp) => emp.firstname)}</td>
                        <td>{o.totalPrice}</td>
                      </>
                    }
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div style={{ textAlign: "right", fontSize: "20px" }}>
          {"Итого: " + props.summ + " руб."}
        </div>
        <div
          onClick={onclickHandler}
          style={{
            margin: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            style={{ visibility: props.orders.length ? "visible" : "hidden" }}
          >
            Экспортировать в Excel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default compose(
  connect(
    (state) => {
      return {
        services: state.firestore.ordered.services,
        employees: state.firestore.ordered.employees,
        subService: state.serviceReducer.services,
        orders: state.reportReducer.orders,
        summ: state.reportReducer.summ,
      };
    },
    (dispatch) => {
      return {
        getSubService: (name) => dispatch(getSubservices(name)),
        createReport: (data) => dispatch(createReport(data)),
      };
    }
  ),
  firestoreConnect([{ collection: "services" }, { collection: "employees" }])
)(Report);
