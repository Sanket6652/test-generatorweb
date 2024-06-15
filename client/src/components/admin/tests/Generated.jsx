import { NavLink } from "react-router-dom";
import TestInfo from "../dashboard/TestInfo";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Generated() {
  return <div>
    <div className="relative bg-[#F5F0E5] border-2 p-2 text-[#A1824A] rounded-xl mt-6 mb-4">
      <label htmlFor="search">
        <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3" />
      </label>
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for generated test" />
    </div>
    {[0, 1, 2].map(test => <div key={test} className="flex items-center justify-between">
      <TestInfo />
      <NavLink to="/admin/dashboard/test/1/details">
        <button className="bg-[#F5F0E5] text-[14px] rounded-3xl">View Details</button>
      </NavLink>
    </div>)}
  </div>
}