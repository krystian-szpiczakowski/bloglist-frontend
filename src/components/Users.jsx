import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { Link, Outlet, useLocation } from "react-router-dom";
import UserStats from "./UserStats";
import { useUserStat } from "./UserStatContext";

const Users = () => {
    const {pathname} = useLocation()
    const {data: userStatistics, error, isLoading} = useUserStat()
    if (isLoading) {
        return <div>Loading users...</div>
    }
    
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
                        <tr key={userStat.user.id}>
                            <td><Link to={`/users/${userStat.user.id}`}>{userStat.user.name}</Link></td>
                            <td>{userStat.blogsCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Outlet />
        </div>
    );
}

export default Users