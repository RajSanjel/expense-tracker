import Activity from "@/components/Activity";
import { DbProvider } from "@/context/DbContext";
import { Link } from "react-router-dom";

export function ActivityPage({ isAuth }: { isAuth: boolean }) {
    document.title = "Activity - Earning Tracker";
    return (
        <>
            {isAuth ?
                <DbProvider>
                    <Activity />
                </DbProvider>
                :
                <>
                    <p className="mb-4">You must be{" "}
                        <Link to="/login" className="underline">
                            logged in
                        </Link> to access the activity page.
                    </p>
                </>
            }
        </>
    )
}

