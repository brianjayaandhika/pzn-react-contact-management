import { Outlet } from "react-router";
import "../../global.css";

import Header from "../Header";
import Footer from "../Footer";

export default function DashboardLayout() {
  return (
    <div className="w-full min-h-screen h-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center text-white font-sans relative">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
