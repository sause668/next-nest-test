import { verifySession } from "../lib/session";
import ErrorPage from "./_components/ErrorPage/ErrorPage";
import Landing from "./_components/Landing/Landing";
import Dashboard from "./_components/Dashboard/Dashboard";


export default async function HomePage() {
  const user = await verifySession();
  if (user instanceof Error) {
    if (user.message === 'No session found') {
      return <Landing />
    } else {
      return <ErrorPage />
    }
  }
  return <Dashboard />
}
