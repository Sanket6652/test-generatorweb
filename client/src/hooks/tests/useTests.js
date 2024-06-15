import { useState } from "react";

export default function useTests() {
  const [loading, setLoading] = useState(false);


  async function deleteTest(id) {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/test/deleteTest/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      return { status: true, payload: data }
    } catch (error) {
      return { status: false, payload: error.message }
    } finally {
      setLoading(false);
    }
  }

  async function updateTest(id, test) {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/test/updateTest/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(test)
      });
      const data = await response.json();
      return { status: true, payload: data }
    } catch (error) {
      return { status: false, payload: error.message }
    } finally {
      setLoading(false);
    }
  }

  async function releaseTest(id) {
    try {
      const response = await fetch(`http://localhost:3000/test/release/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      return { status: true, payload: data };
    } catch (error) {
      return { status: false, payload: error.message }
    } finally {
      setLoading(true)
    }
  }

  return { loading, updateTest, deleteTest, releaseTest }
}