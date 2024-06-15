import { NavLink } from "react-router-dom";
import TestInfo from "./TestInfo";

export default function PreviousTests() {
  return <div className="mt-10">
    <h2>Previous Tests</h2>

    {[0, 1, 2].map(test => <div key={test} className="flex items-center justify-between">
      <TestInfo />
      <NavLink to="/1/status">
        <button className="bg-[#F5F0E5] text-[14px] rounded-3xl">Check Status</button>
      </NavLink>
    </div>)}
  </div>
};