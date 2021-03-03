export const getModels = (idMarka) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        
         firestore.collection("marka").doc(idMarka).get()
            .then(marka => {
                const modelsRef = marka.ref.collection('models')
                const modelsArr = []
                modelsRef.get().then(models => {
                    models.docs.map(model => {
                        modelsArr.push(model.data())
                    })
                    dispatch({type : "GET_MODEL_SUCCESS", modelsArr})
                }).catch(err => {
                    dispatch({ type:"GET_MODEL_ERROR", err })
                })
                
            })

    }
}