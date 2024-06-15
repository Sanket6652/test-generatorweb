import PreviousTests from "./dashboard/PreviousTests";
import UpcomingTests from "./dashboard/UpcomingTests";

export default function Dashboard() {
  return <div>
    <h1>Dashboard</h1>

    <div className="mt-10">
      <UpcomingTests />
      {/* <PreviousTests /> */}
    </div>

  </div>
}