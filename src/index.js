import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './store/redusers/rootReducer';
import thunk from 'redux-thunk';
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import firebase from "./config/config"
import { Provider } from 'react-redux';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(firebase)
  )
)


const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

 const rrfProps = {
     firebase,
     config: rrfConfig,
     dispatch: store.dispatch,
     createFirestoreInstance
   }

window.store = store

  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
  );
  
  reportWebVitals();
