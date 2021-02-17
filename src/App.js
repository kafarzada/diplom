import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AutoWash from './components/AutoWash/AutoWash';
import Car from './components/Cars/Car';
import Client from './components/Client/Client';
import Header from './components/Header/Header';
import History from './components/History/History';
import Home from './components/Home/Home';
import Navbar from './components/layout/Navbar/Navbar';
import Parking from './components/Parking/Parking';
import Report from './components/Report/Report';
import Settings from './components/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Header />
          <div className="main"> 
            <Navbar />
            <div class="dashboard">
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/carwash" component={AutoWash}/>
                  <Route exact path="/parking" component={Parking}/>
                  <Route exact path="/clients" component={Client}/>
                  <Route exact path="/cars" component={Car}/>
                  <Route exact path="/paymenthistory" component={History}/>
                  <Route exact path="/repords" component={Report}/>
                  <Route exact path="/settings" component={Settings}/>
              </Switch>
            </div>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
