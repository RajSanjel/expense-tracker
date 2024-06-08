import { Routes, Route } from "react-router-dom/dist";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup"; ``
import Dashboard from "./pages/Dashboard";
import { Home } from "./pages/Home";
import withAuth from "./HOC/withAuth";
import { NotFound } from "./components/NotFound";
import { ActivityPage } from "./pages/ActivityPage";


const AuthDashboard = withAuth(Dashboard)
const AuthActivityPage = withAuth(ActivityPage)
function App({ isAuth }: { isAuth: boolean }) {
  return (
    <>
      <Navbar />
      <div className="container grid justify-items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          {isAuth &&
            <Route path="/dashboard" element={<AuthDashboard />} />
          }
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/activity" element={<AuthActivityPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default withAuth(App);
