import { NavLink } from "react-router-dom";

import { PresentationChartLineIcon, ClipboardDocumentListIcon, ChartBarIcon, Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";

import UserInfo from "./UserInfo";
import { useState } from "react";

export default function Sidebar() {
  const [isToggled, SetisToggled] = useState(false);

  function toggleSidebar() {
    SetisToggled(prev => !prev)
  }

  return <>
    <aside className={`fixed ${isToggled ? "left-0" : "left-[-100%]"} top-0 bg-white duration-700 lg:sticky w-72 p-4 h-[98vh] flex flex-col z-20 border-2`}>
      <UserInfo />

      <div className="mt-10">
        <NavLink to="/" className="flex items-start gap-2 p-2 mb-2">
          <PresentationChartLineIcon className="icon-lg" />
          <span className="text-[16px]">Dashboard</span>
        </NavLink>

        <NavLink to="/tests/technical" className="flex items-start gap-2 p-2 mb-2">
          <ClipboardDocumentListIcon className="icon-lg" />
          <span className="text-[16px]">Tests</span>
        </NavLink>

        <NavLink to="/results" className="flex items-start gap-2 p-2">
          <ChartBarIcon className="icon-lg" />
          <span className="text-[16px]">Results</span>
        </NavLink>
      </div>

      {/* <button className="mt-auto flex items-start gap-2 p-2" onClick={handleLogout}>
        <span>
          <ArrowLeftStartOnRectangleIcon className="icon-lg" />
        </span>
        <span>Log Out</span>
      </button> */}

    </aside>

    <button className="bg-[#F5F0E5] fixed right-4 top-4 p-3 aspect-square lg:hidden z-20 rounded-3xl" onClick={toggleSidebar}>
      {!isToggled && <Bars2Icon className="icon-lg" />}
      {isToggled && <XMarkIcon className="icon-lg" />}
    </button>
  </>
}