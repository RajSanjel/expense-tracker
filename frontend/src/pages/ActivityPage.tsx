import Activity from "@/components/Activity";
import { DbProvider } from "@/context/DbContext";
import withAuth from "@/HOC/withAuth";
import { Link } from "react-router-dom";

function MustBeLoggedIn() {
    return (<p className="mb-4">You must be{" "}
        <Link to="/login" className="underline">
            logged in
        </Link> to access the activity page.
    </p>)
}
function ActivityPage({ isAuth }: { isAuth: boolean }) {
    document.title = "Activity - Expense Tracker";
    return (
        <>
            {isAuth ?
                <DbProvider>
                    <Activity />
                </DbProvider> : null

            }
        </>
    )
}

export default withAuth(ActivityPage, { requireAuth: true, Fallback: MustBeLoggedIn });