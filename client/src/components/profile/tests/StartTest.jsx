import { NavLink } from "react-router-dom";

export default function StartTest() {
  return <div>
    <h2>SAT Math Practice Test</h2>
    <p className="max-w-[70ch]">You can upload a key to use for grading. You can upload a .csv file with student responses and scores, or a .txt file with student responses only.</p>
    <table className="mt-10">
      <tbody>
        <tr>
          <td className="pr-4">Duration:  1 Hour</td>
          <td>Test Status: Completed</td>
        </tr>
        <tr>
          <td className="pr-4">Test Date: 23 Feb 2023</td>
          <td>Test  Time: 3 pm - 4pm</td>
        </tr>
        <tr>
          <td className="pr-4">Test Question: 30 Question of 2 Marks Each</td>
          <td>Total Marks: 60</td>
        </tr>
        <tr>
          <td className="pr-4">Total Marks: 35</td>
        </tr>
      </tbody>
    </table>

    <NavLink to="/tests/1/test-live">
      <button className="btn-tertiary mt-8">Start Test</button>
    </NavLink>
  </div>
};