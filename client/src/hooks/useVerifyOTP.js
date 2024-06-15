import { useState } from "react";

export default function useVerifyOTP() {
  const [loading, setLoading] = useState(false);

  async function verifyOTP(email, otp) {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/email/verifyOTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: Number(otp) })
      });
      const data = await response.json();
      if (response.status === 401) return { status: false, payload: data.message }
      return { status: true, payload: data };
    } catch (error) {
      return { status: false, payload: error.message };
    } finally {
      setLoading(false);
    }
  }

  return { loading, verifyOTP };
}