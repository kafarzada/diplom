export const getUsers = () => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        const usersRef = firestore.collection("client")

        usersRef.limit(3)
                .get()
                .then((users) => {
                    const u = []
                    users.forEach((doc) => {
                        u.push({...doc.data(), id: doc.id})
                    })
                    dispatch({ type: "GET_USERS", users: u })

                })
                .catch(err => {
                    dispatch({ type: "GET_USERS_ERROR", err })
                })
        
    }
}

export const getCars = () => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        const carsRef = firestore.collection("cars")
        
        carsRef.limit(3)
                .get()
                .then((cars) => {
                    const cr = []
                    cars.forEach((doc) => {
                        cr.push({...doc.data(), id: doc.id})
                    })

                    dispatch({ type: "GET_CARSLIMIT_SUCCESS", cars: cr})
                })
                .catch(err => {
                    dispatch({ type: "GET_CARSLIMIT_ERROR", err })
                })
    }
}