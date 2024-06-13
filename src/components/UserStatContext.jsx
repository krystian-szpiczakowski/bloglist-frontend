import { createContext, useContext } from "react"
import getUsers from "../services/users";
import { useQuery } from "@tanstack/react-query";

const UserStatContext = createContext()

const transformData = (data) => {
    return data.map(user => {
        const userStat = {
            user: {
                id: user.id,
                name: user.name
            },
            blogsCount: user.blogs.length,
            blogs: user.blogs
        }
        return userStat
    })
}
export const UserStatProvider = ({ children }) => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        select: transformData
    })

    return (
        <UserStatContext.Provider value={{data, error, isLoading}}>
            {children}
        </UserStatContext.Provider>
    )
}

export const useUserStat = () => {
    return useContext(UserStatContext)
}

export default UserStatContext
