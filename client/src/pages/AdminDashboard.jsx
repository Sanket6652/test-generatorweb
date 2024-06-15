import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

export default function AdminDashboard() {
  return <div className="flex gap-4 items-start p-4">
    <Sidebar />
    <div className="border-2 grow p-4 max-w-full min-h-screen">
      <Outlet />
    </div>
  </div>
}