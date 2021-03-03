import React, {Component} from 'react'
import {  Container,  } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../store/actions/authActions'
import s from './Signin.module.css'

class SignIn extends Component {

  state = {
    email: "",
    password: ""
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handlerSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.props.singIn(this.state)
  }

  render() {

    const {authError, auth}= this.props
    if(auth.uid) return <Redirect to="/"/>
    
    return (

      <Container>
        <div className={s.signPage}>
          <form   className={s.signform} onSubmit={this.handlerSubmit}>
            <h2>Авторизация</h2>
            <div>
              <input type="email" id="email" onChange={this.handlerChange} placeholder="Email"/>
            </div>

            <div>
              <input type="password" id="password" onChange={this.handlerChange} placeholder="Пароль"/>
            </div>


              <button type="submit">Войти</button>
              <div className={s.signError}>{authError ? <p>{authError}</p> : null}</div>

          </form>
        </div>
      </Container>  
    )
  }
}



const mapStateToProps= (state) => {
  console.log(state.firebase)
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDipatchToProps = (dispatch) => {
  return {
    singIn: (creds) => dispatch(signIn(creds))
  }
}
export default connect(mapStateToProps, mapDipatchToProps)(SignIn)