
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import AuthReducer from "./authReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})


export default rootReducer