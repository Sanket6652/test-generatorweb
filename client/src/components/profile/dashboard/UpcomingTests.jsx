import { useEffect, useState } from "react";
import useGetTests from "../../../hooks/useGetTests";
import TestInfo from "./TestInfo";
import Loader from "../../Loader";
import Error from "../../Error";

export default function UpcomingTests() {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState();
  const { loading, getTests } = useGetTests();

  useEffect(function () {
    async function retrieve() {
      try {
        const response = await getTests();
        if (response.status) setTests(response.payload);
        else setError(response.message);
      } catch (error) {
        setError(error.message)
      }
    }

    retrieve();
  }, [])
  return <div>
    <h2>Upcoming Tests</h2>
    {loading && <Loader />}
    {error && <Error message={error} />}
    {tests.tests && tests.tests.map((test, index) => <TestInfo key={test._id} test={test} index={index} />)}
  </div>
}