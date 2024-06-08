import { Link } from "react-router-dom";

export function Home() {
    document.title = "Earning Tracker"
    return <div>Home, if you are logged in please refer to <Link to="/dashboard" className="underline">Dashboard</Link></div>
}