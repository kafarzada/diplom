import React from 'react'
import  "./App.css"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './components/Home/Home'
import Parking from './components/Parking/Parking'
import AutoWash from './components/AutoWash/AutoWash'
import Client from './components/Client/Client';
import Employee from './components/Employee/Employee';
import History from './components/History/History';
import Settings from './components/Settings/Settings';
import Header from './components/Header/Header'
import SignIn from './components/SignIn/SingIn';
import { connect, useSelector } from 'react-redux';
import EmployeeDetails from './components/Employee/EmployeDetails';
import ClientDetails from './components/Client/ClientDetails';
import NewClient from './components/Client/NewClient';
import NewCar from './components/Cars/NewCar';
import NewEmployee from './components/Employee/NewEmployee';
import OrdeDetails from './components/AutoWash/OrdeDetails';
import Service from './components/Service/Service';
import Report from './components/Report/Report';

function App(props) {
  const {auth} = props 

  return (
    <BrowserRouter>
        <div className="App">
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
          
        {auth.uid ? <Row className="main">
                    <Col sm={2}>
                      <Navbar />
                    </Col>
                    <Col sm={10} className="page">
                      <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route  path="/parking" component={ Parking }></Route>
                        <Route  path="/carwash" component={ AutoWash }></Route>
                        <Route  path="/orderDetails/:orderId" component={ OrdeDetails }></Route>
                        <Route  path="/clients" component={ Client }></Route>
                        <Route path="/newClient" component= {NewClient}></Route>
                        <Route path="/newCar/:userId" component= { NewCar }></Route>
                        <Route  path="/clientdetails/:id" component={ ClientDetails }></Route>
                        <Route  path="/employee" component={ Employee }></Route>
                        <Route path="/newemployee" component={ NewEmployee }></Route>
                        <Route path="/employeedetails/:id" component={ EmployeeDetails }></Route>
                        <Route path="/service" component={ Service }></Route>
                        <Route path="/report" component={ Report }></Route>
                        <Route  path="/history" component={ History }></Route>
                        <Route  path="/settings" component={ Settings }></Route>
                      </Switch>
                    </Col>
                  </Row>   : <SignIn />

        }
        </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {

  return {
    auth: state.firebase.auth,
    
  }
}

export default connect(mapStateToProps)(App)
