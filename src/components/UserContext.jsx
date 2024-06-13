import { createContext, useReducer } from "react"

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            const newState = { ...state, username: action.payload }
            return newState
        case "LOGIN_ERROR":
            return { ...state, error: action.payload, user: null }
        case "LOGOUT":
            return null
        default:
            return state
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const userData = JSON.parse(window.localStorage.getItem("loggedBlogUser"))
    const [user, userDispatch] = useReducer(userReducer, userData)
    console.log("user", user)
    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext