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
          <NavigationMenuList>
            <NavigationMenuItem className="text-white font-bold ">
              Expense Tracker
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
