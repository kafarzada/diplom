export const addClient = (newClient) => {
    return (dispatch, getState, {getFireStore}) => {
        const firestore = getFireStore()

        const {firstname, lastname, patronomic, phone, age} = newClient

        firestore.collection('client').add({
            firstname,
            lastname,
            patronomic,
            phone,
            age,
            scope: 0,
            cars: 0
        }).then((client) => {
            dispatch({ type: "ADD_NEW_CLIENT_SUCCES", client })
        }).catch((err) => {
            dispatch({ type: "ADD_NEW_CLIENT_ERROR", err })
        })
    }
}

export const removeClient = (id) => {
    return (dispatch, getState, {getFirestore} ) => {
        const firestore = getFirestore()
        
        firestore.collection("client").doc(id).delete()
            .then(() => {
                dispatch({ type: "REMOVE_CLIENT_SUCCESS" })

                // const query  = firestore.collection().doc("car").where("clientId", "==", id)
                // query.get().then((q) => {
                //     q.forEach((doc) => {
                //         doc.ref.delete()
                //     })
                // })
            })
            .catch((err) => {
                dispatch({ type: "REMOVE_CLIENT_ERROR", err })
            })


    }
}