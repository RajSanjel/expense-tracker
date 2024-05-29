import { AddExpInc } from "@/components/AddExpInc";
import { Chart } from "@/components/Chart";
import { DataTable } from "@/components/DataTable";
import { Report } from "@/components/Report";
import withAuth from "@/HOC/withAuth";

interface UserData {
  userid: string;
  username: string;
  email: string;
  displayName: string;
}

interface AuthProps {
  isAuth: boolean;
  userData: UserData;
}

function Dashboard({ isAuth, userData }: AuthProps) {
  return (
    <div >
      {
        isAuth && <h1 className="mb-4 text-xl font-semibold text-left">Welcome, {userData.displayName}</h1>
      }
      <div className="grid grid-flow-row grid-rows-2 gap-6 xl:gap-5 xl:grid-flow-col justify-items-center pb-8 md:auto-cols-auto">
        <AddExpInc />
        <Report />
        <Chart />
        <DataTable />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);