import { useState } from "react";
const MAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export default function useSendOTP() {
  const [loading, setLoading] = useState(false);

  async function sendOTP(email) {
    if (!MAIL_REGEX.test(email)) return { status: false, payload: "enter email in correct format ..@gmail.com" };
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/email/sendOTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      return { status: true, payload: data };
    } catch (error) {
      return { status: false, payload: error.message };
    } finally {
      setLoading(false);
    }
  }

  return { loading, sendOTP };
}