import React, { Component, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { addClient } from "../../store/actions/clientActions";
import s from "./FormStyle.module.css";

class NewClient extends Component {
  onSubmit = (data) => {
    data.cars = 0;
    data.scope = 0;
    data.registrationDate = new Date();
    this.addNewClient(data);
  };

  addNewClient = (data) => {
    this.props.addClient(data);
    this.props.history.goBack();
  };
  render() {
    return (
      <div  style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h1>Новый Клиент</h1>
        <NewClientForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}


const NewClientFormTemp = (props) => {
  const s = {
    width: "600px",
    border: "none",
    borderBottom: "1px solid black",
    marginBottom: "10px",
  };
  
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={"input"}
          name="firstname"
          placeholder="Фамилия"
          style={s}
        />
      </div>
      <div>
        <Field component={"input"} name="lastname" placeholder="Имя" style={s}/>
      </div>
      <div>
        <Field component={"input"} name="patronymic" placeholder="Отчество" style={s}/>
      </div>

      <div>
        <Field component={"input"} name="age" placeholder="Возраст" style={s}/>
      </div>

      <div>
        <label>Пол</label>
        <div>
          <div>
          <label  >
              <Field name="sex" component="input" type="radio" value="Мужчина" />{" "}
              Мужчина
            </label>
          </div>
            <div>
            <label>
            <Field name="sex" component="input" type="radio" value="Женщина" />{" "}
            Женщина
          </label>
            </div>
            <div>
            <label>
              <Field name="sex" component="input" type="radio" value="другое" />{" "}
              Другое
            </label>
            </div>
        </div>
      </div>

      <div>
        <Field component={"input"} name="phone" placeholder="Номер Телефона" style={s}/>
      </div>

      <Button type="submit">Добавить Клиента</Button>
    </form>
  );
};

const NewClientForm = reduxForm({
  form: "newClient",
})(NewClientFormTemp);

const mapDispatchToProps = (dispatch) => {
  return {
    addClient: (newClient) => dispatch(addClient(newClient)),
  };
};

export default connect(null, mapDispatchToProps)(NewClient);
