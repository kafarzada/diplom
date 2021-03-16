export const addClient = (newClient) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        const {firstname, lastname, patronymic, phone, age, sex} = newClient

        firestore.collection('client').add({
            firstname,
            lastname,
            patronymic,
            phone,
            age,
            sex,
            scope: 0,
            cars: 0,
            registrationDate: new Date()
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

         firestore.collection('client').doc(id).delete()
            .then(() => {
                dispatch({type: "REMOVE_CLIENT_SUCCESS"})
            })
            .catch((err) => {
                dispatch({type: "REMOVE_CLIENT_ERROR"}, err)
            })
    }
}


export const addCar = (newCar) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        const userCollectionRef = firestore.collection('client').doc(newCar.userId)
        const carCollectionRef = firestore.collection('cars')
        
        userCollectionRef.collection('cars').add({
            marka: newCar.marka,
            model: newCar.model,
            gosNumber: newCar.gosNumber,
            status: true,
            addedDate: new Date(),
            
        })
        .then(result => {
            console.log("success")
            carCollectionRef.add({
                marka: newCar.marka,
                model: newCar.model,
                gosNumber: newCar.gosNumber,
                userID: newCar.userId,
                status: true,
                timeOfEntry: new Date(),
                addedDate: new Date(),
                chekOutTime: null
            })
        })
        .catch(err => {
            console.log(err)
        })
        
    }
}


export const getCars = (idUser) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        const userDocRef = firestore.collection("client").doc(idUser)

        const carCollection =  userDocRef.collection("cars")

        carCollection.get().then(cars => {
            const c =  []
            cars.forEach(car => {

                c.push({ id: car.id, car: car.data() })
            })
            dispatch({ type: "GET_CARS_SUCCESS", c })
        })
        .catch(err => {
            dispatch({ type: "GET_CARS_ERR", err })
        })

    }
}


export const removeCar = (idCar, idUser) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        const userDocRef = firestore.collection("client").doc(idUser)

        userDocRef.collection("cars").doc(idCar).delete()
            .then(() => {
                const shapshot = firestore.collection('cars').where("userID", "=", idUser)
                dispatch({type: "CAR_REMOVE_SUCCESS"})
            })
            .catch(err => {
                dispatch({type: "CAR_REMOVE_ERR", err})
            })
    }
}