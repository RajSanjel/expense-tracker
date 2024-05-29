import withAuth from "@/HOC/withAuth";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

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

function Navbar({ isAuth, userData }: AuthProps) {
  const [state, setState] = useState(false);
  const menus = [
    { title: "Dashboard", path: "/" },
    ...(isAuth
      ? []
      : [
        { title: "Login", path: "/login" },
        { title: "Signup", path: "/signup" },
      ]),
  ];

  function handleLogut() {
    localStorage.removeItem("token")
    window.location.reload()
  }

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
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"
            }`}
        >
          <ul className="justify-end items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-slate-900 hover:text-slate-600">
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
            {isAuth && <DropdownMenu>
              <DropdownMenuTrigger>Account</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Name: {userData.displayName}</DropdownMenuItem>
                <DropdownMenuItem>Email: {userData.email}</DropdownMenuItem>
                <DropdownMenuItem>Username: {userData.username}</DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="outline" className="bg-red-600 hover:bg-red-500 w-full text-white hover:text-white" onClick={handleLogut}>Logout</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default withAuth(Navbar);
