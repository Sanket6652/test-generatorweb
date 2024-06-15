import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { checkIfUserLoggedIn } from "../redux/store";

const MAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const PASS_REGEX = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
// number, capital letter, small letter, special character

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  async function signup({ name, email, password, division, confirmPassword }) {
    console.log(name, email, password, division, confirmPassword)
    const info = handleInputErrors({ name, email, password, division, confirmPassword });
    console.log(info)
    if (!info.status) return { status: false, payload: info.payload }
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword, division }),
      });
      const data = await response.json()
      localStorage.setItem("user", JSON.stringify({ ...data, type: "user" }))
      // dispatch({ type: "user/logInUser", payload: data });
      dispatch(checkIfUserLoggedIn());
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function signupAdmin({ name, email, password, confirmPassword }) {
    const info = handleInputErrors({ name, email, password, confirmPassword });
    if (!info.status) return { status: false, payload: info.payload }
    console.log(info)
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/auth/adminignup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json()
      localStorage.setItem("user", JSON.stringify({ ...data, type: "admin" }))
      // dispatch({ type: "user/logInUser", payload: data });
      dispatch(checkIfUserLoggedIn());
      return { status: true }
    } catch (error) {
      return ({ status: false, message: error.message });
    } finally {
      setLoading(false)
    }
  }


  return { loading, signup, signupAdmin };
}

function handleInputErrors({ name, email, password, confirmPassword }) {
  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return { status: false, payload: "Fill all the fields" };
  }

  if (!MAIL_REGEX.test(email)) return { status: false, payload: "Email should be of the format ...@gmail.com" };
  if (!PASS_REGEX.test(password)) return { status: false, payload: "Password should contain at least one number, special character and an alphabet" };

  if (password !== confirmPassword) {
    toast.error("");
    return { status: false, payload: "Passwords do not match" };
  }

  if (password.length < 8) {
    toast.error("");
    return { status: false, payload: "Password must be at least 8 characters" };
  }

  return { status: true };
}