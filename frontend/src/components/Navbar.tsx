import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";

export function Navbar() {
  return (
    <>
      <div className="bg-slate-900 w-full p-6 sticky mb-5 top-0 align-middle z-10">
        <NavigationMenu>
          <NavigationMenuList className="flex justify-between	">
            <NavigationMenuItem className="text-white font-bold ">
              Expense Tracker
            </NavigationMenuItem>
            <NavigationMenuItem className="text-white font-bold ">
              <Button className="bg-white text-black hover:bg-slate-100">
                Signup
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="text-white font-bold ">
              <Button className="bg-white text-black hover:bg-slate-100">
                Login
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
