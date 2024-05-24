import { AddExpInc } from "./components/AddExpInc";
import { Chart } from "./components/Chart";
import { Navbar } from "./components/Navbar";
import { DataTable } from "./components/DataTable";
import { Report } from "./components/Report";

function App() {
  return (
    <>
      <Navbar />
      <div className="container grid justify-items-center">
        <div className="grid grid-flow-row grid-rows-2 gap-6 xl:gap-5 xl:grid-flow-col justify-items-center p-8">
          <AddExpInc />
          <Report />
          <Chart />
          <DataTable />
        </div>
      </div>
    </>
  );
}

export default App;
