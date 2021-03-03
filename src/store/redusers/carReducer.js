const initialState = {
    error: null,
    models: []
}

const CarReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_MODEL_SUCCESS":
            console.log("GET_MODEL_SUCCESS", action.modelsArr);
            return {
                ...state,
                error: null,
                models: [...action.modelsArr]
            }
        
        case "GET_MODEL_ERROR":
            console.log("GET_MODEL_ERROR", action.err);
            return state
    
        default:
            return state
    }

    return state
}

export default CarReducer