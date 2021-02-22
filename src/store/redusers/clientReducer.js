const initState = {

}

const  clientReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_NEW_CLIENT_SUCCES":
            console.log("ADD_NEW_CLIENT_SUCCES", action.client)
            return state

        case "ADD_NEW_CLIENT_ERROR":
            console.log("ADD_NEW_CLIENT_ERROR", action.err)
            return state

        case "REMOVE_CLIENT_SUCCESS":
            console.log("REMOVE_CLIENT_SUCCESS")
            return state

        case "REMOVE_CLIENT_ERROR":
                console.log("REMOVE_CLIENT_ERROR", action.err)
            return state

        default:
            return state
    }

    return state
}

export default clientReducer