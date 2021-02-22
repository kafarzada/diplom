
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import AuthReducer from "./authReducer";
import clientReducer from "./clientReducer";
import EmployeeReducer from "./employeeReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    client: clientReducer,
    employeeReducer: EmployeeReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})


export default rootReducer