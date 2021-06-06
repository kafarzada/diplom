
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import AuthReducer from "./authReducer";
import CarReducer from "./carReducer";
import clientReducer from "./clientReducer";
import EmployeeReducer from "./employeeReducer";
import {reducer as formReducer} from "redux-form"
import mainReducer from "./mainReducer";
import parkingReducer from "./parkingReducer";
import serviceReducer from "./serviseReducer";

const rootReducer = combineReducers({
    main: mainReducer,
    auth: AuthReducer,
    client: clientReducer,
    car: CarReducer,
    parking: parkingReducer,
    employeeReducer: EmployeeReducer,
    serviceReducer: serviceReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    form: formReducer
})


export default rootReducer