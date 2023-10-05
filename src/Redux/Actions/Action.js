export const setNameStore = (payload) => {
    return {
        type: "SetName",
        payload: payload
    }
}

export const setEmailStore = (payload) => {
    return {
        type: "SetEmail",
        payload: payload
    }
}

export const setIsEmailVerifiedStore = (payload) => {
    return {
        type: "SetIsEmailVerified",
        payload: payload
    }
}

export const setIsLoggedInStore = (payload) => {
    return {
        type: "SetIsLoggedIn",
        payload: payload
    }
}

export const setTokenStore = (payload) => {
    return {
        type: "SetToken",
        payload: payload
    }
}

// Action creators are functions that return action objects, which are used to dispatch actions to the Redux store. 
// These action creators can be used with Redux's dispatch function to update the user state in the Redux store.
// For example, to set a new user name, you would call dispatch(setNameStore("Ram")) with the appropriate value for
// the payload. The action will be dispatched to the reducer, and the user name will be updated in the store accordingly.

