import { AddExpInc } from "./components/AddExpInc";
import { Chart } from "./components/Chart";
import { Display } from "./components/Display";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="grid grid-flow-col gap-32 w-auto justify-center">
        <AddExpInc />
        <Chart />
        </div>
        <Display />
      </div>
    </>
  );
}

export default App;
