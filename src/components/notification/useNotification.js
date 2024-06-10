import { useContext } from "react"
import NotificationContext from "./NotificationContext"
export const useNotification = () => {
    const [notifications, notificationDispatch] = useContext(NotificationContext)
    const addNotification = (message) => {
        notificationDispatch({ type: "ADD_NOTIFICATION", payload: { id: Date.now(), message } })
    }

    const removeNotification = (id) => {
        notificationDispatch({ type: "REMOVE_NOTIFICATION", payload: { id } })
    }

    return {
        notifications,
        addNotification,
        removeNotification
    }
}