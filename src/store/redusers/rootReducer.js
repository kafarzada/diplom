
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import AuthReducer from "./authReducer";
import CarReducer from "./carReducer";
import clientReducer from "./clientReducer";
import EmployeeReducer from "./employeeReducer";
import {reducer as formReducer} from "redux-form"
import mainReducer from "./mainReducer";

const rootReducer = combineReducers({
    main: mainReducer,
    auth: AuthReducer,
    client: clientReducer,
    car: CarReducer,
    employeeReducer: EmployeeReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    form: formReducer
})


export default rootReducer