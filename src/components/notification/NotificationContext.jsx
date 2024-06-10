import { createContext } from "react"
import { useReducer } from "react"
const notificationReducer = (state, action) => {
    switch (action.type) {
        case "ADD_NOTIFICATION":
            return state.concat(action.payload)
        case "REMOVE_NOTIFICATION":
            const notificationId = action.payload.id
            return state.filter(notification => notification.id !== notificationId)
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notifications, notificationDispatch] = useReducer(notificationReducer, [])

    return (
        <NotificationContext.Provider value={[notifications, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}


export default NotificationContext