import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endTest } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export default function useSubmitTest() {
  const [loading, setLoading] = useState(false);
  const { userResponses, _id } = useSelector(store => store.liveTest);
  const { _id: userId } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitTest() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/test/submit/${_id}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: userResponses, id: _id, userId }),
      })
      const data = await response.json();
      console.log(data)
      dispatch(endTest());
      navigate("/tests/test-completed");
      return { status: true, payload: data };
    } catch (error) {
      console.log(error.message)
      return { status: false, payload: error.message };
    } finally {
      setLoading(false);
    }
  }

  return { loading, submitTest }
}