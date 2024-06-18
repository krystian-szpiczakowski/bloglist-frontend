import { useParams } from "react-router-dom"
import { useUserStat } from "./UserStatContext"

const UserStats = () => {
    const params = useParams()
    const {data} = useUserStat()
    if (!data) {
        return null
    }
    const userStat = data.find(userStat => userStat.user.id === params.id)

    return (
        <div>
            <h2>{userStat.user.name}</h2>
            <h3>Added {userStat.blogsCount} blogs</h3>
            <ul>
                {
                    userStat.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
                }
            </ul>
        </div>
    )
}

export default UserStats