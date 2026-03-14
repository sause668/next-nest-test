import { updateUserSession } from "@/app/(site)/_actions/user-actions";
import "./NavBar.css";
import ErrorPage from "../ErrorPage/ErrorPage";
import NavBar from "./NavBar";

export default async function NavBarShell() {
    const user = await updateUserSession();

    if (user instanceof Error && user.message !== 'No session found') return <ErrorPage />

    return <NavBar user={user} />
}