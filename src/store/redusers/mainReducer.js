const initialState = {}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USERS":
            console.log("GET_USERS")
            return {
                ...state,
                users: action.users
            }

        case "GET_USERS_ERROR":
            console.log("GET_USERS_ERROR", action.err)
            return state

        case "GET_CARSLIMIT_SUCCESS":
            console.log("GET_CARSLIMIT_SUCCESS", action.cars)
            return {
                ...state,
                cars: action.cars
            }

        
        default:
            return state
    }
    return state
}

export default mainReducer