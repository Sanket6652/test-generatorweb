import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import Loader from "../../Loader";
import Error from "../../Error";

import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [filters, setFilters] = useState([false, false])

  function handleSearch(str) {
    setDisplayedUsers(users.filter(user => user.name.toLowerCase().includes(str.toLowerCase())));
  }

  function handleSortByDivision() {
    const newUsers = filters[0] ? users.slice().sort((a, b) => a.division > b.division) : users.slice().sort((a, b) => a.division < b.division);
    setDisplayedUsers(newUsers);
    setFilters(prev => [!prev[0], prev[1]])
  }

  function handleSortByNoTests() {
    const newUsers = filters[1] ? users.slice().sort((a, b) => a.completedTests.length < b.completedTests.length) : users.slice().sort((a, b) => a.division < b.division);
    setDisplayedUsers(newUsers);
    setFilters(prev => [prev[0], !prev[1]]);
  }

  useEffect(function () {
    async function retrieve() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/getusers/alluser");
        const data = await response.json();
        setUsers(data.UserList);
        setDisplayedUsers(data.UserList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    retrieve()
  }, [])

  return <div>
    <div className="relative bg-[#F5F0E5] border-2 p-2 text-[#A1824A] rounded-xl mb-4">
      <label htmlFor="search">
        <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3" />
      </label>
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for users" onChange={e => handleSearch(e.target.value)} />
    </div>


    <div className="border-2 rounded-xl mt-4">
      <h1 className="p-4">Users</h1>
      {loading && <Loader />}
      {error && <Error message={error} setter={setError} />}
      <div className="overflow-x-auto">
        <div className="font-bold flex items-center justify-start border-t-2 p-4">
          <p className="min-w-40 px-4">Name</p>
          {/* <p className="min-w-40 px-4">Username</p> */}
          <p className="w-72 px-4 min-w-40">Email</p>
          <div role="button" className="hover:text-green-600 flex items-center gap-2 min-w-40" onClick={handleSortByDivision}>
            <p>Division</p>
            <ArrowsUpDownIcon className="w-6 mr-4" />
          </div>
          <div role="button" className="hover:text-green-600 flex items-center gap-2 min-w-40" onClick={handleSortByNoTests}>
            <p>Tests Given</p>
            <ArrowsUpDownIcon className="w-6 mr-4" />
          </div>
        </div>
        {displayedUsers?.map(user =>
          <div key={user._id} className="flex items-center justify-start border-t-2 p-4">
            <p className="min-w-40 px-4">{user.name}</p>
            {/* <p className="min-w-40 px-4">john</p> */}
            <p className="w-72 px-4 ">{user.email}</p>
            <p className="min-w-40 px-4">{user.division}</p>
            <p className="min-w-40 px-4">{user?.completedTests?.length || 0}</p>
          </div>
        )}
      </div>
    </div>
  </div>
}