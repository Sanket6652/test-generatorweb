import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useGetTest from "../../../hooks/useGetTest";
import Error from "../../Error";
import Loader from "../../Loader";

export default function TestDetails() {
  const { id } = useParams();

  const { loading, getTest } = useGetTest();
  const [test, setTest] = useState();
  const [error, setError] = useState();

  useEffect(function () {
    async function retrieve() {
      try {
        const response = await getTest(id);
        if (response.status) setTest(response.payload.test)
        else setError(response.payload)
      } catch (error) {
        setError(error.message);
      }
    }
    retrieve()
  }, [])

  return <div>
    <h2>{test?.title}</h2>
    {/* <p className="max-w-[70ch]">You can upload a key to use for grading. You can upload a .csv file with student responses and scores, or a .txt file with student responses only.</p> */}

    {loading && <Loader />}
    {error && <Error message={error} setter={setError} />}

    {test && <table className="mt-8">
      <tbody>
        <tr>
          <td className="pt-4 pr-4"><b>Duration:</b>  {test?.testDuration} Mins</td>
          <td><b>Test Status:</b> {test.participants.length} people gave this test</td>
        </tr>
        <tr>
          <td className="pr-4"><b>Test Date:</b> {test.availableAt.substring(0, 10)}</td>
          <td className="pr-4"><b>Passing Marks:</b> {test.passingScore}</td>
        </tr>
        <tr>
          <td className="pr-4"><b>Test Question:</b> {test.questions.length} Question of 1 Marks Each</td>
          <td><b>Total Marks:</b> {test.highestMarks}</td>
        </tr>
      </tbody>
    </table>}
  </div>
}