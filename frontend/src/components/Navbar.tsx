import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import withAuth from "../HOC/withAuth";

function Navbar({ isAuth }: { isAuth: boolean }) {
  const [state, setState] = useState(false);
  console.log(isAuth);
  const menus = [
    { title: "Dashboard", path: "/" },
    ...(isAuth
      ? [] // If authenticated, no additional menu items
      : [
          // If not authenticated, add login and signup menu items
          { title: "Login", path: "/login" },
          { title: "Signup", path: "/signup" },
        ]),
  ];
  console.log(menus);
  return (
    <nav className="bg-white w-full border-b md:border-0 shadow-md mb-8">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link to="/">
            <h1 className="text-2xl font-bold text-slate-900">
              Earning Tracker
            </h1>
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-900 outline-none p-2 rounded-md focus:border-gray-600 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-slate-900 hover:text-slate-600">
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default withAuth(Navbar);
