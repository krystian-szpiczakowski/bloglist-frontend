import { useQuery } from "@tanstack/react-query";
import getUsers from "../services/users";
import _ from "lodash";

const Users = () => {
    const queryResult = useQuery({
        queryKey: ["users"],
        queryFn: getUsers
    })

    if (queryResult.isLoading) {
        return <div>Loading users...</div>
    }

    const users = queryResult.data
    const userStatistics = users.map(user => {
        return { user: user.name, blogsCount: user.blogs.length }
    })

    return (
        <div>
            <h2>Users</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {_.orderBy(userStatistics, ["blogsCount"], ["desc"]).map(userStat => (
                        <tr key={userStat.user}>
                            <td>{userStat.user}</td>
                            <td>{userStat.blogsCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users