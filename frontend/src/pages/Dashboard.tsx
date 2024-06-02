import { AddExpInc } from "@/components/AddExpInc";
import Chart from "@/components/Chart";
import { DataTable } from "@/components/DataTable";
import Report from "@/components/Report";
import { DbProvider } from "@/context/DbContext";

function Dashboard({ isAuth }: { isAuth: boolean }) {

  return (
    < >
      {isAuth && <div className="grid grid-flow-row grid-rows-2 gap-6 xl:gap-5 xl:grid-flow-col justify-items-center pb-8 md:auto-cols-auto">
        <DbProvider>
          <AddExpInc />
          <Report />
          <Chart />
          <DataTable />
        </DbProvider>
      </div>}
    </>
  );
};

export default Dashboard;