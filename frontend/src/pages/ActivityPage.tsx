import Activity from "@/components/Activity";
import { DbProvider } from "@/context/DbContext";
import { Navigate } from "react-router-dom";

export function ActivityPage({ isAuth }: { isAuth: boolean }) {
    document.title = "Activity - Earning Tracker";
    return (
        <>
            {isAuth ?
                <DbProvider>
                    <Activity />
                </DbProvider>
                :
                <Navigate to="/login" />
            }
        </>
    )
}

