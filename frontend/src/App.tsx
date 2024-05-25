import { Routes, Route } from "react-router-dom/dist";
import { AddExpInc } from "./components/AddExpInc";
import { Chart } from "./components/Chart";
import { Navbar } from "./components/Navbar";
import { DataTable } from "./components/DataTable";
import { Report } from "./components/Report";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

function App() {
  return (
    <>
      <Navbar />
      <div className="container grid justify-items-center">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

const Home = () => {
  return (
    <>
      <div className="grid grid-flow-row grid-rows-2 gap-6 xl:gap-5 xl:grid-flow-col justify-items-center pb-8">
        <AddExpInc />
        <Report />
        <Chart />
        <DataTable />
      </div>
    </>
  );
};

export default App;
