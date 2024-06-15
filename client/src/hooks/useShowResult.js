import { useState } from "react";
export default function useShowResult() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function showResult() {
    try {
      setLoading(true);
      const response = await fetch(``);
      const data = await response.json();
      console.log(data)
    } catch (error) {
      setError(error);
    }
  }
  return { loading, error, showResult };
}