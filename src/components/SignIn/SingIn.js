import React, {Component} from 'react'
import {  Container,  } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../store/actions/authActions'

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
        <form onSubmit={this.handlerSubmit}>
          <div>
            <label htmlFor="email">Почта</label>
            <input type="email" id="email" onChange={this.handlerChange}/>
          </div>

          <div>
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password" onChange={this.handlerChange}/>
          </div>

          <div>
            <button type="submit">Войти</button>
            <div>{authError ? <p>{authError}</p> : null}</div>
          </div>
        </form>
      </Container>
    )
  }
}



const mapStateToProps= (state) => {
  
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