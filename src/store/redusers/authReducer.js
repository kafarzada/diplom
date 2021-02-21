const initState = {
    authError : null
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("login success")
            console.log(state)
            return state
        case "LOGIN_ERROR":
            console.log("LOGIN ERROR", action.err)
            return {
                ...state,
                authError: action.err.message
            }
        case "SIGNOUT_SUCCESS": 
            console.log("SIGNOUT_SUCCESS")
            return {
                ...state,
                authError: null
            }
        default:
            return state
    }

    return state
}

export default AuthReducer