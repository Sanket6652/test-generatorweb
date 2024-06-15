import { useState } from "react";

export default function useCreateTest() {
  const [loading, setLoading] = useState(false);

  async function createTest(info) {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/test/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      const data = await response.json();
      return { status: true, payload: data };
    } catch (error) {
      return { status: false, payload: error.message };
    } finally {
      setLoading(false);
    }
  }

  return { loading, createTest }
}