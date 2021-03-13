const initState = {
    totalCar:0,
    cars: []
}

const  clientReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_NEW_CLIENT_SUCCES":
            console.log("ADD_NEW_CLIENT_SUCCES", action.client)
            return state

        case "ADD_NEW_CLIENT_ERROR":
            console.log("ADD_NEW_CLIENT_ERROR", action.err)
            return state
        
        case "GET_CARS_SUCCESS":
            console.log("GET_CARS_SUCCESS", action.c)
            return {
                ...state,
                cars: [...action.c],
                totalCar: action.c.length
            }
        
            case "CAR_REMOVE_SUCCESS":
                console.log("CAR_REMOVE_SUCCESS")
                return state
            
                case "CAR_REMOVE_ERR":
                    console.log("CAR_REMOVE_ERR", action.err)
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