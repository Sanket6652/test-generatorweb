import useSubmitTest from "../../../hooks/tests/useSubmitTest"
import Loader from "../../Loader";

export default function ModalEndExam({ children, message }) {
  const { loading, submitTest } = useSubmitTest();

  async function handleSubmit() {
    try {
      await submitTest();
    } catch (error) {
      console.log(error.message)
    }
  }

  return <div className='fixed inset-0 bg-[#000000b2] select-none'>
    <div className="text-black bg-white fixed w-[400px] p-4 border-2 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <h2>{message}</h2>
      {loading && <Loader />}
      {children}
      <button className="bg-red-600 text-white mt-8 mx-4 rounded-lg" onClick={handleSubmit}>Submit</button>
    </div>
  </div>
}