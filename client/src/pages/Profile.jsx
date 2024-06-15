import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile/Sidebar";

export default function Profile() {
  return <div className="flex gap-4 items-start p-4 relative">
    <Sidebar />
    <div className="border-2 grow p-4 min-h-screen">
      <Outlet />
    </div>
  </div>
}