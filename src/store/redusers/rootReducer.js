
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

const rootReducer = combineReducers({
    main: mainReducer,
    auth: AuthReducer,
    client: clientReducer,
    car: CarReducer,
    parking: parkingReducer,
    employeeReducer: EmployeeReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    //firestore: createFirestoreInstance
    form: formReducer
})


export default rootReducer