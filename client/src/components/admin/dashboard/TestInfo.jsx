export default function TestInfo({ test, index }) {
  return <div className="my-8">
    <p className="leading-3 font-semibold">{index + 1}&#41; {test.title}</p>
    {/* <span className="text-slate-400 text-[12px]">A practice test for the SAT Math section</span> */}
  </div>
}