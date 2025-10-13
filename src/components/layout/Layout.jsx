import { Outlet } from "react-router";
import "../../global.css";

export default function Layout() {
  return (
    <div className="w-full min-h-screen h-full bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center text-white font-sans">
      <Outlet />
    </div>
  );
}
