import { useParams } from "react-router-dom"

export default function SortedTests() {
  const params = useParams();
  console.log(params)

  return <div>
    Sorted Tests
  </div>
}