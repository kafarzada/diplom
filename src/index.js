import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './store/redusers/rootReducer';
import thunk from 'redux-thunk';
import {reduxFirestore, getFirestore} from 'redux-firestore'
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase'
import firebase from "./config/config"
import { Provider } from 'react-redux';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {useFirestoreForProfile: true, userProfile: "users" ,attachAuthIsReady: true})
  )
)

window.store = store


store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById('root')
  );
  
  reportWebVitals();
})


