import { useState } from "react";

export default function useGetTest() {
  const [loading, setLoading] = useState(false);

  async function getTest(id) {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/test/gettest/${id}`);
      const data = await response.json();
      return { status: true, payload: data };
    } catch (error) {
      return { status: false, payload: error.message };
    } finally {
      setLoading(false);
    }
  }

  return { loading, getTest }
}