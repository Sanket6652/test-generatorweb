import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion } from "../../../redux/store";

export default function TestSidebar() {
  const [isToggled, setIsToggled] = useState(false);
  const { questions, activeQuestionNo, userResponses } = useSelector(store => store.liveTest);
  const dispatch = useDispatch();

  function toggleSidebar() {
    setIsToggled(prev => !prev);
  }

  function handleSetQuestion(id) {
    dispatch(setCurrentQuestion(id));
  }

  return <>
    <aside className={`bg-white w-96 md:min-w-[400px] fixed ${isToggled ? "left-0" : "left-[-100%]"} top-0 md:static md:w-96 md:h-auto border-r-2 py-20 shadow-lg`}>

      <h1 className="text-center mb-10">Questions</h1>

      <div className="text-[20px] text-center font-semibold flex flex-wrap gap-4 px-4">
        {questions?.map((question, index) => <button
          key={question.id}
          className={`w-14 ${activeQuestionNo === index + 1 ? "bg-green-600 text-white" : userResponses[question.id - 1] === -1 ? "bg-red-300" : "bg-green-200"} aspect-square border-2 rounded-lg`}
          onClick={() => handleSetQuestion(index + 1)}
        >{index + 1}</button>)}
      </div>
    </aside >
    <button className="bg-[#F5F0E5] fixed right-4 bottom-4 p-3 aspect-square lg:hidden z-20 rounded-3xl border-2 shadow-2xl" onClick={toggleSidebar}>
      {!isToggled && <Bars2Icon className="icon-lg" />}
      {isToggled && <XMarkIcon className="icon-lg" />}
    </button>
  </>
}