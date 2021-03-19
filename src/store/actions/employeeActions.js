export const addEmployee = (employee) => {
    return (dispatch, getState, {getFirestore}) => {

        const firestore = getFirestore()
        
        firestore.collection('employees').add({
            firstname: employee.firstname,
            lastname: employee.lastname,
            patronymic: employee.patronymic,
            phone: employee.phone,
            position: employee.position,
            startAt: new Date(),

        }).then( (employee) => {
            dispatch({type: "ADD_EMPLOYEE_SUCCESS", employee})
        }).catch((err) => {
            dispatch({type: "ADD_EMPLOYEE_ERROR", err})
        })
    }
}


export const removeEmployee = (id) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        firestore.collection("employees").doc(id).delete()
            .then(() => {
                dispatch({type: "EMPLOYEE_REMOVE_SUCCESS"})
            })
            .catch(err => {
                dispatch({type: "EMPLOYEE_REMOVE_ERROR", err})
            })
    }
}