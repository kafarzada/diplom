const initState = {}

const EmployeeReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_EMPLOYEE_SUCCESS":
            console.log("ADD_EMPLOYEE_SUCCESS", action.employee);
            return state
        case "ADD_EMPLOYEE_ERROR":
            console.log("ADD_EMPLOYEE_ERROR", action.err);
            return state
        case "EMPLOYEE_REMOVE_SUCCESS":
            console.log("EMPLOYEE_REMOVE_SUCCESS");
            return state
        case "EMPLOYEE_REMOVE_SUCCESS":
            console.log("EMPLOYEE_REMOVE_ERROR", action.err);
            return state
        default:
            return state
    }
    return state
}

export default EmployeeReducer