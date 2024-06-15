import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Loader from "../../Loader";
import Error from "../../Error"
import { useSelector } from "react-redux";

export default function AdminResults() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [tests, setTests] = useState([]);
  const [displayedTests, setDisplayedTests] = useState([]);
  const { _id } = useSelector(store => store.user);

  function handleSearch(str) {
    setDisplayedTests(tests.filter(test => test.title.toLowerCase().includes(str.toLowerCase())));

  }

  useEffect(function () {
    async function retrieve() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/test/testCreatedbyAdmin/${_id}`);
        const data = await response.json();
        setTests(data);
        setDisplayedTests(data);
        // console.log(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false);
      }
    }
    retrieve()
  }, [])

  return <div>
    <div className="relative bg-[#F5F0E5] border-2 p-2 text-[#A1824A] rounded-xl mt-4 mb-4">
      <label htmlFor="search">
        <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3" />
      </label>
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for test results" onChange={e => handleSearch(e.target.value)} />
    </div>
    {loading && <Loader />}
    {error && <Error message={error} setter={setError} />}
    <div className="flex flex-wrap gap-4 mt-10 justify-eenly">
      {displayedTests.map(test => (<div key={test._id} className="bg-[#f5f0e5] grow p-4 rounded-lg w-full md:w-[49%] sm:max-w-[350px]">
        <NavLink to={`/admin/results/${test._id}`}>
          <h3>{test.title}</h3>
        </NavLink>
      </div>))}
    </div>
    {tests?.length === 0 && <h1 className="text-center">You haven&#39;t listed any tests</h1>}
  </div>
}