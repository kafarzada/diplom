const initialState = {}

const parkingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_NEW_PLACE":
            console.log("ADD_NEW_PLACE")
            return state

        case "ADD_NEW_PLACE_ERROR":
            console.log("ADD_NEW_PLACE_ERROR", action.msg)
            return state
    
        default:
            return state
    }
    return state
}

export default parkingReducer