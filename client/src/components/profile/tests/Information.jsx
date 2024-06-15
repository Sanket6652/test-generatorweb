import { useSelector } from "react-redux"
import TestTimer from "./TestTimer"

export default function Information({ setter }) {
  const activeQuestionNo = useSelector(store => store.liveTest.activeQuestionNo)
  const questionsLegth = useSelector(store => (store.liveTest.questions).length)

  return <div>
    <p className="font-bold text-[20px]">Question {activeQuestionNo} of {questionsLegth}</p>
    <TestTimer minutes={4} setter={setter} />
  </div>
}