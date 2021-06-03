

export const addPlace = (n) => {
    return ( dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        firestore.collection("parking").add({
            number: n,
            carId: null,
            isBusy: false
        })
        .then(place => {
            dispatch({type: "ADD_NEW_PLACE"})
        })
        .catch(err => {
            dispatch({type: "ADD_NEW_PLACE_ERROR", msg: err.message})
        })
    }
}

export const attach = (data) => {
    return ( dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

        const parkingRef = firestore.collection('parking').doc(data.placeId);
        parkingRef.set({
            carId: data.carId,
            isBusy: true
        }, { merge: true })
    }
}

export const clearPlace = (placeId) => {
    return ( dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()

         firestore.collection('parking').doc(placeId).update({
             carId: null,
             isBusy: false
         })
    }
}