import { useSelector } from "react-redux";

export default function TestCart({ test, showDetails }) {
  const { _id } = useSelector(store => store.user);

  const isGiven = test.participants.findIndex(user => user.userId === _id);

  const testStartTime = new Date(test.availableAt);
  const currentTime = new Date();
  const testEndTime = new Date(testStartTime.getTime() + (test.duration * 60000));


  return <>
    <div className="bg-[#f5f0e5] grow p-4 rounded-lg w-full md:w-[49%] md:max-w-[350px] cursor-pointer select-none" onClick={() => showDetails(test)}>
      <h3>{test.title}</h3>
      <p>Date: {test.availableAt.substring(0, 10).split("-").join(" / ")}</p>
      <p>Duration: {test.testDuration} mins</p>
      <p><strong>Available At :</strong> {test.availableAt.substring(11, 19)}</p>

      {currentTime >= testStartTime && currentTime <= testEndTime
        ? "Test is going on"
        : isGiven !== -1
          ? <p className="text-right text-blue-600 font-semibold">Given</p>
          : <p className="text-right text-red-600 font-semibold">Not Given</p>
      }
    </div>
  </>
}