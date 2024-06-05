import Activity from "@/components/Activity";
import { DbProvider } from "@/context/DbContext";

export function ActivityPage() {
    return (
        <DbProvider>
            <Activity />
        </DbProvider>
    )
}