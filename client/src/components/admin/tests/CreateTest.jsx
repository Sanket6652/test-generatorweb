import { useRef, useState } from "react";
import { inputStyles, labelStyles } from "../../../utils/data";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import useCreateTest from "../../../hooks/useCreateTest";
import { useSelector } from "react-redux";
import Error from "../../Error";

const optionsInitialState = [{ id: 1, value: "" }, { id: 2, value: "" }, { id: 3, value: "" }, { id: 4, value: "" }];

export default function CreateTest() {
  const { loading, createTest } = useCreateTest();

  const [domain, setDomain] = useState("Technical");

  const fileRef = useRef(null);

  const [questionTitle, setQuestionTitle] = useState("");
  const [options, setOptions] = useState(optionsInitialState);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const { _id } = useSelector(store => store.user)
  const [error, setError] = useState();
  const [isCreated, setIsCreated] = useState(false);


  const qLength = questions.length;

  function addQuestion() {
    if (questionTitle === "" || !correctAnswer || !options[0] || !options[1] || !options[2] || !options[3]) return
    const question = {
      title: questionTitle,
      options,
      id: qLength + 1,
      answer: correctAnswer
    }
    setQuestions(prev => ([...prev, question]))
    setOptions(optionsInitialState);
    setQuestionTitle("");
    setCorrectAnswer()
  }

  async function handleForm(e) {
    e.preventDefault();
    const info = {
      title: e.target[0].value,
      highestMarks: e.target[1].value,
      passingScore: e.target[2].value,
      availableAt: e.target[3].value,
      testDuration: e.target[4].value,
      answerKey: e.target[5].value,
      questions,
      createdBy: _id,
      domain
    }
    console.log(info);
    try {
      const response = await createTest(info);
      if (!response.status) setError(response.payload)
      else setIsCreated(true)
    } catch (error) {
      setError(error.message)
    }
  }

  return <div>
    <div className="md:w-[512px] mx-4 md:mx-auto mt-10">
      <form onSubmit={handleForm} className="h-[75vh] overflow-y-auto">
        <span>

          <label htmlFor="test-name" className={labelStyles}>Test Name</label>
          <input type="text" id="test-name" className={inputStyles} placeholder="Enter Test Name" />

          <label htmlFor="score" className={labelStyles}>Total Score</label>
          <input type="text" id="score" className={inputStyles} placeholder="Total Score" />

          <label htmlFor="passing" className={labelStyles}>Passing Score</label>
          <input type="text" id="passing" className={inputStyles} placeholder="Passing Score" />

          <label htmlFor="availableAt" className={labelStyles}>Available At</label>
          <input type="datetime-local" id="availableAt" className={inputStyles} placeholder="Available At" />

          <label htmlFor="testDuration" className={labelStyles}>Test Duration</label>
          <input type="number" id="testDuration" className={inputStyles} placeholder="Test Duration in minutes" min={1} />

          <input ref={fileRef} type="file" hidden />
        </span>


        {/* questions */}
        <hr className="my-8 border-2" />
        <p className="mb-4">Total no of questions added - {qLength}</p>
        <label htmlFor="question" className={labelStyles}>Question No {qLength + 1} -</label>
        <input
          type="text"
          id="question"
          className={inputStyles}
          placeholder="Enter you question"
          value={questionTitle}
          onChange={e => setQuestionTitle(e.target.value)}
        />

        <label className={labelStyles}>Enter 4 options</label>
        <input
          type="text"
          placeholder="option 1"
          className={inputStyles}
          value={options[0].value}
          onChange={e => setOptions(prev => prev.map((previous, index) => index === 0 ? ({ ...previous, value: e.target.value }) : previous))} />

        <input
          type="text"
          placeholder="option 2"
          className={inputStyles}
          value={options[1].value}
          onChange={e => setOptions(prev => prev.map((previous, index) => index === 1 ? ({ ...previous, value: e.target.value }) : previous))} />

        <input
          type="text"
          placeholder="option 3"
          className={inputStyles}
          value={options[2].value}
          onChange={e => setOptions(prev => prev.map((previous, index) => index === 2 ? ({ ...previous, value: e.target.value }) : previous))} />

        <input
          type="text"
          placeholder="option 4"
          className={inputStyles}
          value={options[3].value}
          onChange={e => setOptions(prev => prev.map((previous, index) => index === 3 ? ({ ...previous, value: e.target.value }) : previous))} />

        <label htmlFor="correctOption" className={labelStyles}>Correct Option</label>
        <input
          type="number"
          id="correctOption"
          min={1}
          max={4}
          className={inputStyles}
          placeholder="correct option"
          value={Number(correctAnswer)}
          onChange={e => setCorrectAnswer(prev => e.target.value >= 1 && e.target.value <= 4 ? Number(e.target.value) : prev)}
        />
        <select value={domain} onChange={e => setDomain(e.target.value)} className={inputStyles}>
          <option value="Technical">Mathematics</option>
          <option value="Non Technical">Programming</option>
        </select>
        <button type="button" className="bg-[#dedede] block ml-auto mb-4 rounded-3xl" onClick={addQuestion}>Add Question</button>
        {isCreated && <div className="py-4 px-4 bg-green-400 my-4">Test created successfully</div>}
        {error && <Error message={error} setter={setError} />}
        <button className="btn-primary text-white block ml-auto rounded-3xl" type="submit">Create Test</button>
      </form>
    </div>
  </div>
}