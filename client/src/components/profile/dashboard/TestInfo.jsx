export default function TestInfo({ test, index }) {
  return <div className="my-6">
    <p className="leading-3 font-[400]">{index + 1}&#41; {test.title} - {test.availableAt.substring(0, 10).split("-").join(" / ")}</p>
  </div>
}