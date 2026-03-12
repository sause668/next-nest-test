import { getUser, sessionUser, updateUserSession } from "../../_actions/user-actions";
import "./Profile.css";
import Profile from "./Profile";
import Login from "./Login";

export default async function ProfileShell() {
    const user = await updateUserSession();

    if (user instanceof Error) {
        if (user.message === 'No session found') {
        return (
            <Login />
        )
        } else {
            return (
                <div>
                    <h2>Something went wrong!</h2>
                </div>
            )
        }
    }
    return (
        <Profile user={user} />
    );
}