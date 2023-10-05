const initialState = {
    Name: "",
    Email: "",
    isEmailVerified: false,
    isLoggedIn: false,
    token: ""
}
// The userReducer function takes the current state and an action as parameters. Based on the action type, it performs certain operations on the state and returns the updated state. a new state object is created using the spread operator (...currentState) and modified with the action payload.

const userReducer = (currentState = initialState, action) => {
    switch (action.type) {
        case "SetName":
            return {
                ...currentState,
                Name: action.payload
            }

        case "SetEmail":
            return {
                ...currentState,
                Email: action.payload
            }

        case "SetIsEmailVerified":
            return {
                ...currentState,
                isEmailVerified: action.payload
            }

        case "SetIsLoggedIn":
            return {
                ...currentState,
                isLoggedIn: action.payload
            }

        case "SetToken":
            return {
                ...currentState,
                token: action.payload
            }
            // If an action type is not recognized , the reducer returns the current state as is. 
            // This ensures that Redux state remains immutable and unchanged if the action type is not handled.
 
         default:
            return currentState
    }
}

export default userReducer
