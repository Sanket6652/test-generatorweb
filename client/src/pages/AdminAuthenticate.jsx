import { Link, Outlet } from "react-router-dom";

export default function AdminAuthenticate() {
  return <div className="md:w-[512px] mx-4 md:mx-auto pb-16">
    <h1 className="text-[28px] text-center font-bold my-10">Welcome Admin</h1>
    <Outlet />
    <Link to="/user"><button className="bg-slate-300 text-slate-500 w-full mt-14 rounded-lg">User Login</button></Link>
  </div>
}